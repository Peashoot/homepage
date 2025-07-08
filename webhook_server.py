#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
import hmac
import hashlib
import json
import subprocess
import yaml
import os
from typing import Dict, Optional
import logging

# 配置日志
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

def load_config() -> Dict:
    """加载配置文件"""
    try:
        with open('config.yml', 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except Exception as e:
        logger.error(f"加载配置文件失败: {str(e)}")
        return {}

def verify_signature(payload_body: bytes, secret_token: str, signature_header: str) -> bool:
    """验证 GitHub webhook 签名"""
    if not signature_header:
        logger.warning("未收到签名头")
        return False
    
    try:
        expected_signature = hmac.new(
            secret_token.encode('utf-8'),
            payload_body,
            hashlib.sha256
        ).hexdigest()
        received_signature = signature_header.replace('sha256=', '')
        
        return hmac.compare_digest(expected_signature, received_signature)
    except Exception as e:
        logger.error(f"验证签名时出错: {str(e)}")
        return False

def execute_shell_script(script_path: str) -> Optional[str]:
    """执行对应的 shell 脚本"""
    if not os.path.exists(script_path):
        logger.error(f"脚本文件不存在: {script_path}")
        return f"Shell script not found: {script_path}"
    
    try:
        result = subprocess.run(
            ['sh', script_path],
            capture_output=True,
            text=True,
            check=True
        )
        logger.info(f"脚本执行成功: {script_path}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        logger.error(f"执行脚本失败: {str(e)}")
        return f"Error executing shell script: {e.stderr}"

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        # 获取请求头信息
        signature_header = request.headers.get('X-Hub-Signature-256')
        event = request.headers.get('X-GitHub-Event')
        delivery = request.headers.get('X-GitHub-Delivery')
        content_type = request.headers.get('Content-Type')
        
        # 记录请求信息
        logger.info(f"收到 webhook 请求: event={event}, delivery={delivery}, content_type={content_type}")
        
        # 获取请求体
        payload_body = request.get_data()
        if not payload_body:
            logger.error("请求体为空")
            return jsonify({'status': 'error', 'message': 'Empty request body'}), 400
            
        # 记录原始请求体（仅在调试模式下）
        logger.debug(f"Raw payload: {payload_body.decode('utf-8', errors='ignore')}")
        
        # 检查 Content-Type
        if content_type != 'application/json':
            logger.error(f"不支持的 Content-Type: {content_type}")
            return jsonify({'status': 'error', 'message': 'Unsupported Content-Type'}), 400
        
        try:
            data = json.loads(payload_body.decode('utf-8'))
        except json.JSONDecodeError as e:
            logger.error(f"JSON 解析错误: {str(e)}")
            return jsonify({
                'status': 'error',
                'message': 'Invalid JSON payload',
                'detail': str(e)
            }), 400
        
        # 获取仓库信息
        repository = data.get('repository', {}).get('full_name')
        if not repository:
            logger.error("请求中没有仓库信息")
            return jsonify({'status': 'error', 'message': 'Repository information not found'}), 400
            
        logger.info(f"处理仓库: {repository}")
        
        # 获取配置
        config = load_config()
        if not config:
            logger.error("无法加载配置文件")
            return jsonify({'status': 'error', 'message': 'Failed to load configuration'}), 500
        
        # 检查仓库配置是否存在
        if repository not in config.get('repositories', {}):
            logger.error(f"仓库未配置: {repository}")
            return jsonify({'status': 'error', 'message': 'Repository not configured'}), 400
        
        repo_config = config['repositories'][repository]
        
        # 验证签名
        if not verify_signature(payload_body, repo_config['secret'], signature_header):
            logger.error("签名验证失败")
            return jsonify({'status': 'error', 'message': 'Invalid signature'}), 401
        
        # 只处理 push 事件
        if event != 'push':
            logger.info(f"忽略非 push 事件: {event}")
            return jsonify({'status': 'ignored', 'message': 'Event not handled'}), 200
        
        # 执行对应的 shell 脚本
        script_path = repo_config['script']
        logger.info(f"开始执行脚本: {script_path}")
        result = execute_shell_script(script_path)
        
        if result:
            return jsonify({
                'status': 'success',
                'message': 'Shell script executed',
                'output': result
            })
        else:
            return jsonify({
                'status': 'error',
                'message': 'Failed to execute shell script'
            }), 500
            
    except Exception as e:
        logger.exception("处理 webhook 请求时发生错误")
        return jsonify({
            'status': 'error',
            'message': 'Internal server error',
            'detail': str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 