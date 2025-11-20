# Git 命令大全

> Git 是分布式版本控制系统，是现代软件开发必不可少的工具。

## 📚 学习路径

### 基础入门
- [Git 配置](#git-配置)
- [仓库初始化](#仓库初始化)
- [基本操作](#基本操作)
- [分支管理](#分支管理)

### 进阶内容
- [远程操作](#远程操作)
- [撤销与回退](#撤销与回退)
- [标签管理](#标签管理)
- [高级技巧](#高级技巧)

## ⚙️ Git 配置

### 用户信息配置
```bash
# 设置全局用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 查看当前配置
git config --list

# 设置编辑器
git config --global core.editor "code --wait"

# 设置默认分支名
git config --global init.defaultBranch main
```

### 配置文件位置
```bash
# 系统级配置
/etc/gitconfig

# 用户级配置
~/.gitconfig

# 项目级配置
.git/config
```

## 🏗️ 仓库初始化

### 创建新仓库
```bash
# 初始化新仓库
git init

# 初始化裸仓库（用于服务器）
git init --bare

# 克隆远程仓库
git clone <repository-url>
git clone <repository-url> <directory-name>

# 克隆指定分支
git clone -b <branch-name> <repository-url>
```

### 仓库状态查看
```bash
# 查看仓库状态
git status

# 查看简洁状态
git status -s

# 查看配置信息
git config --list
```

## 🔄 基本操作

### 文件操作
```bash
# 添加文件到暂存区
git add <file>
git add .                    # 添加所有文件
git add -A                   # 添加所有文件（包括删除的）
git add *.js                 # 添加所有js文件

# 查看文件差异
git diff                     # 工作区 vs 暂存区
git diff --cached            # 暂存区 vs 本地仓库
git diff HEAD                # 工作区 vs 本地仓库
git diff <branch>            # 当前分支 vs 指定分支
git diff <file>              # 指定文件的差异

# 查看文件历史
git log -- <file>
git log -p -- <file>         # 显示每次提交的差异
```

### 提交操作
```bash
# 提交暂存区的文件
git commit -m "提交信息"

# 提交并跳过暂存区
git commit -am "提交信息"

# 修改最后一次提交
git commit --amend
git commit --amend -m "新的提交信息"

# 查看提交历史
git log
git log --oneline            # 简洁显示
git log --graph              # 图形化显示
git log --author="作者名"     # 按作者筛选
git log --since="2024-01-01" # 按时间筛选
git log --grep="关键词"       # 按提交信息筛选
```

## 🌿 分支管理

### 分支操作
```bash
# 查看分支
git branch                   # 查看本地分支
git branch -r                # 查看远程分支
git branch -a                # 查看所有分支

# 创建分支
git branch <branch-name>      # 创建但不切换
git checkout -b <branch-name> # 创建并切换

# 切换分支
git checkout <branch-name>
git switch <branch-name>     # Git 2.23+

# 合并分支
git merge <branch-name>      # 合并到当前分支
git merge --no-ff <branch>   # 不使用快进合并

# 删除分支
git branch -d <branch-name>  # 删除已合并分支
git branch -D <branch-name>  # 强制删除分支
```

### 变基操作
```bash
# 变基到指定分支
git rebase <branch-name>

# 交互式变基
git rebase -i HEAD~3         # 修改最近3次提交

# 变基冲突解决
git rebase --continue        # 继续变基
git rebase --abort           # 取消变基
git rebase --skip            # 跳过当前提交
```

## 🌐 远程操作

### 远程仓库管理
```bash
# 查看远程仓库
git remote                   # 查看远程仓库名称
git remote -v                # 查看详细信息

# 添加远程仓库
git remote add <name> <url>
git remote add origin https://github.com/user/repo.git

# 删除远程仓库
git remote remove <name>
git remote rm origin

# 修改远程仓库URL
git remote set-url <name> <new-url>
```

### 推送与拉取
```bash
# 推送到远程仓库
git push origin <branch>
git push -u origin <branch>  # 设置上游分支
git push --all               # 推送所有分支
git push --tags              # 推送所有标签

# 拉取远程更新
git fetch                    # 获取远程更新但不合并
git fetch origin             # 获取指定远程仓库更新
git pull                     # 获取并合并
git pull origin <branch>     # 拉取指定分支

# 查看远程分支状态
git remote show origin
```

## ↩️ 撤销与回退

### 工作区操作
```bash
# 撤销工作区的修改
git checkout -- <file>
git restore <file>           # Git 2.23+

# 撤销所有工作区修改
git checkout .
git restore .

# 清理未跟踪的文件
git clean -f                 # 删除未跟踪文件
git clean -fd                # 删除未跟踪文件和目录
git clean -n                 # 预览将要删除的文件
```

### 暂存区操作
```bash
# 取消暂存
git reset HEAD <file>
git restore --staged <file>  # Git 2.23+

# 重置暂存区
git reset
git reset HEAD               # 重置所有暂存文件
```

### 版本回退
```bash
# 软重置（保留工作区和暂存区）
git reset --soft HEAD~1

# 混合重置（保留工作区）
git reset HEAD~1             # 默认方式
git reset --mixed HEAD~1

# 硬重置（丢弃所有修改）
git reset --hard HEAD~1

# 回退到指定提交
git reset --hard <commit-id>

# 创建反向提交
git revert HEAD              # 撤销最后一次提交
git revert <commit-id>       # 撤销指定提交
```

## 🏷️ 标签管理

### 标签操作
```bash
# 创建标签
git tag <tag-name>           # 轻量标签
git tag -a <tag-name> -m "标签信息"  # 附注标签
git tag -a v1.0.0 -m "版本1.0.0"

# 查看标签
git tag                      # 查看所有标签
git tag -l "v1.*"            # 查看匹配的标签
git show <tag-name>          # 查看标签详情

# 推送标签
git push origin <tag-name>   # 推送单个标签
git push origin --tags       # 推送所有标签

# 删除标签
git tag -d <tag-name>        # 删除本地标签
git push origin :refs/tags/<tag-name>  # 删除远程标签
```

## 🚀 高级技巧

### 储藏操作
```bash
# 储藏当前工作
git stash
git stash save "储藏信息"

# 查看储藏列表
git stash list

# 应用储藏
git stash apply              # 应用最新储藏
git stash apply stash@{1}    # 应用指定储藏
git stash pop                # 应用并删除储藏

# 删除储藏
git stash drop               # 删除最新储藏
git stash drop stash@{1}     # 删除指定储藏
git stash clear              # 清空所有储藏
```

### 选择性提交
```bash
# 交互式添加
git add -i                   # 交互式暂存
git add -p                   # 补丁模式

# 选择性提交
git cherry-pick <commit-id>  # 应用指定提交
git cherry-pick <commit1>..<commit2>  # 应用范围提交
```

### 历史查询
```bash
# 查找提交
git log --grep="关键词"
git log --author="作者"
git log --since="1 week ago"

# 查看文件历史
git blame <file>             # 查看文件每行修改信息
git log --follow <file>      # 查看文件历史（包括重命名）

# 查找引入bug的提交
git bisect start             # 开始二分查找
git bisect bad               # 标记当前版本有bug
git bisect good <commit-id>  # 标记指定版本无bug
git bisect run <test-script> # 自动运行测试
```

### 子模块管理
```bash
# 添加子模块
git submodule add <repository-url> <path>

# 初始化子模块
git submodule init
git submodule update

# 克隆包含子模块的项目
git clone --recursive <repository-url>

# 更新子模块
git submodule update --remote
```

## 🔧 实用别名配置

### 常用别名
```bash
# 状态简化
git config --global alias.st status

# 提交简化
git config --global alias.ci commit
git config --global alias.co checkout
git config --global alias.br branch

# 日志美化
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# 查看未提交的文件
git config --global alias.unstage "reset HEAD --"

# 显示最后一次提交
git config --global alias.last "log -1 HEAD"
```

## 🎯 最佳实践

### 提交信息规范
```bash
# 提交信息格式
<type>(<scope>): <subject>

<body>

<footer>

# 类型说明
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式修改
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动

# 示例
feat(auth): 添加用户登录功能

- 实现JWT认证
- 添加登录表单验证
- 集成第三方OAuth

Closes #123
```

### 分支策略
```bash
# 主分支
main/master     # 生产环境代码
develop         # 开发环境代码

# 功能分支
feature/功能名   # 新功能开发
bugfix/问题描述  # bug修复
hotfix/紧急修复  # 紧急修复
release/版本号   # 发布准备
```

### 工作流程
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发和提交
git add .
git commit -m "feat: 添加新功能"

# 3. 推送分支
git push origin feature/new-feature

# 4. 合并到主分支
git checkout main
git merge feature/new-feature

# 5. 删除功能分支
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

## 🔗 相关资源

- [Git 官方文档](https://git-scm.com/doc)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)
- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

> 💡 **学习建议**: 先掌握基础的 add/commit/push 操作，再逐步学习分支管理和高级功能。多在实际项目中练习，理解每个命令的作用和影响。