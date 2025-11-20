const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始部署到 GitHub Pages...');

try {
  // 1. 构建项目
  console.log('📦 构建项目...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. 切换到 gh-pages 分支
  console.log('🌿 切换到 gh-pages 分支...');
  execSync('git checkout gh-pages', { stdio: 'inherit' });

  // 3. 清理旧文件（保留必要的文件）
  console.log('🧹 清理旧文件...');
  const filesToKeep = ['.git', '.gitignore', '.nojekyll'];
  const currentDir = '.';
  
  // 删除除了保留文件之外的所有文件和目录
  const items = fs.readdirSync(currentDir);
  for (const item of items) {
    if (!filesToKeep.includes(item)) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      if (stat.isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(itemPath);
      }
    }
  }

  // 4. 复制构建后的文件 (Windows compatible)
  console.log('📋 复制构建后的文件...');
  execSync('xcopy ..\\.vitepress\\dist\\* . /E /I /Y', { stdio: 'inherit' });

  // 5. 添加并提交更改
  console.log('📝 提交更改...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });

  // 6. 推送到远程
  console.log('📤 推送到远程仓库...');
  execSync('git push origin gh-pages', { stdio: 'inherit' });

  // 7. 切换回 master 分支
  console.log('🔙 切换回 master 分支...');
  execSync('git checkout master', { stdio: 'inherit' });

  console.log('✅ 部署成功！');
  console.log('🌐 访问地址: https://website20161126.github.io/devLog-notes/');

} catch (error) {
  console.error('❌ 部署失败:', error.message);
  process.exit(1);
}