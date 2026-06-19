# 🌐 Cloudflare 优选 IP


**本次更新**: 自动同步上游并筛选
> **筛选规则**: 每个国家/地区保留速度最快的 5 个节点    
> **备注格式**: 节点国家/地区缩写已转换为中文名    
> **更新频率**: GitHub Actions 定时自动更新    

---

## 🔗 订阅链接

> **⚠️ 注意：** 以下链接来自本 fork，会自动同步上游并按规则过滤。

| 线路分类 | 高速优选 (推荐) | 所有可用 (适合二次测速) |
| --- | --- | --- |
| **过滤订阅** | [https://raw.githubusercontent.com/3436639997/cfip/refs/heads/main/best_ips.txt](https://raw.githubusercontent.com/3436639997/cfip/refs/heads/main/best_ips.txt) | [https://raw.githubusercontent.com/3436639997/cfip/refs/heads/main/full_ips.txt](https://raw.githubusercontent.com/3436639997/cfip/refs/heads/main/full_ips.txt) |

### 💡 链接区别说明

* **高速优选**: 基于上游 `best_ips.txt`，每个国家/地区最多保留 5 个，备注改为中文名。
* **所有可用**: 基于上游 `full_ips.txt`，按速度字段排序后每个国家/地区最多保留 5 个，备注改为中文名。

---

## 🛠️ 同款工具

如果你希望在本地自主测速，请访问：

* **仓库地址**: [HandsomeMJZ/cfip-tools](https://github.com/HandsomeMJZ/cfip-tools)
* **提示**: 仓库提供已编译好的 Windows 版本，开箱即用。

---

## 📖 使用说明

### 1. 适用范围

已有大量用户反馈，该订阅对绝大多数地区的**电信**与**联通**网络具有良好适配性。若你的网络环境不匹配，建议使用上述工具自行测速。

### 2. 自动化配置

* **本地优选**: 若无需上传同步，直接运行对应系统的 start 脚本即可。
* **自动上传**: 若需将结果同步至 GitHub，请编辑对应系统的 push 脚本，配置好你的 Token 与仓库地址。

### 3. EdgeTunnel 部署流程

1. 复制上述对应的**订阅链接**。
2. 进入 **EdgeTunnel 后台**。
3. 创建优选订阅，模式选择 **“优选订阅模式 - 自定义”**。
4. 在 **“订阅接口 / API / URL”** 栏中粘贴链接。
5. 点击 **“验证可用性”**，随后选择 **“追加 API”**。
6. 保存并重新订阅即可。
