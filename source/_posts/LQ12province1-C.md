---
title: 第十二届蓝桥杯省赛第一场 C/C++ 组题解
date: 2022-04-12 14:44:34
tags: 蓝桥杯
category: 题解
---

<script> embedpdf("题面", ["LQ12province1_CA", "LQ12province1_CB"]) </script>

## 空间

常识题，1MB=1024KB, 1KB=1024Bytes, 1Byte=8bits

故 256MB 可以存储 $256 \times 1024 \times 1024 \times 8 \div 32=67108864$ 个 32 位二进制整数。

答案：$67108864$

## 卡片

模拟即可，首先开一个数组 $a$，记录 $0 \sim 9$ 的卡片各有 $2021$ 张

$i$ 从 $1$ 开始递增，对于每个 $i$，遍历其所有数位的数字，于数组 $a$ 中使卡片数量减 $1$，若发现无法减了（值为 $0$），则说明 $i$ 拼不出来，那么答案就是 $i-1$。

答案：$3181$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F2.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 直线

我们只需要遍历所有点对，对于每对点对求出其所成直线的一般式（为什么是一般式？因为斜截式这种涉及到浮点数的方式，会因精度问题导致答案错误），然后装进 `std::set` 去重（$Ax+By+C=0$ 只需要装 $(A,B,C)$ 即可），最后输出 `std::set` 的大小即可

当然，因为一条直线有无限个一般式，所以不要忘记约分

答案：$40257$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F3.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 货物摆放

### 枚举

直接暴力遍历 $L$ 和 $W$，$H$ 随之确定即可

注意不是直接 $O(n^2)$ 暴力，$n=2021041820210418$，这属于作死

容易发现，其实 $L$、$W$、$H$ 的组合只需要得出一次即可，因为三个数的其他组合可以靠组合数学解决：

* 若三个数互相不同，共有 $6$ 种排列方式
* 若只有两个数相同，共有 $3$ 种排列方式
* 若三个数相等，共有 $1$ 种排列方式

所以说 $L$ 只需要遍历到 $\sqrt[3]{n}$，$W$ 只需要遍历到 $\sqrt{\frac{n}{L}}$ 即可

### 质因数分解

首先找出 $2021041820210418$ 的质因子：

$$2,3,3,3,17,131,2857,5882353$$

然后问题就变成了把这 $8$ 个数分到三个集合（乘积分别作为 $L,W,H$）内且允许出现空集（视为 $1$）有几种方法。

于是 $3^5 \times (1+3+6) = 2430$

答案：$2430$

## 路径

最短路裸题，因为没有负权边所以 Bellman-Ford，Dijkstra，甚至 Floyd 都行（反正是提答题）。

答案：$10266837$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F5.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 回路计数

dfs 爆搜时间复杂度过于巨大，显然不行。需要用状压 dp 来优化

* 状态设计：$dp[set][u]$ 代表当前到达点 $u$ 处且已经到达了 $set$ 中所有点的方案数（$u \in set$）
* 初始状态：$dp[\{1\}][1]=1$
* 转移方程：$$dp[set][u]=\sum_{v \in set,(u,v) \in E}dp[set-u][v]$$
* 所求答案：$$\sum_{u \in V,(1,u) \in E}dp[V][u]$$

$set$ 为可用一二进制数 $s$ 表示（状态压缩），$s$ 的第 $i$ 位为 $1$ 代表 $i$ 结点已到达过

答案：$881012367360$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F6.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 时间显示

题目给的输入即为毫秒级的 UNIX 时间戳，直接调库即可，注意需要输出 GMT 时间而不是 UTC 时间。

* `C/C++`：先把毫秒转化为秒，然后用 `gmtime` 转 `tm` 后再用 `strftime` 格式化输出。
* `Java`：`Date` 可以直接用毫秒时间戳构造，用 `SimpleDateFormat` 设置 GMT 时区后格式化输出。
* `Python`：先把毫秒转化为秒，`time.gmtime` 后 `time.strftime` 格式化输出。

当然不会调库的话也可以不调，因为只需要输出时分秒，所以把毫秒转换为秒后再对 $60 \times 60 \times 24=86400$ 取模，然后再转换出时分秒即可。

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F7.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 砝码称重

天平问题是经典的背包问题

* 状态设计：$dp[i][j]$ 表示选到第 $i$ 个砝码时重量 $j$ 能否称出来
* 初始状态：$dp[i][w_i]=true$
* 状态转移方程：$$dp[i][j]=dp[i-1][j] \lor dp[i-1][|j-w_i|] \lor dp[i-1][j+w[i]]$$
* 所求答案：$$\sum_{j=1}^{\sum w_i}[dp[n][j]=true]$$

第一维的转移只跟上一维有关，可以把式子拆开后使用滚动数组优化，不过在实现时要注意 $j$ 遍历的顺序

$$dp[j]=dp[j] \lor dp[j-w_i],~dp[j]=dp[j] \lor dp[j+w_i]$$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F8.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 杨辉三角形

首先，本题一定有解，因为 $\dbinom{n}{1}=n$

直接递推杨辉三角只能拿20分，空间及时间复杂度都太大了——都是 $O(n^2)$，我们需要分析一下

显然杨辉三角形的右半部分是没用的，直接去掉即可

对于杨辉三角中的任意一个数字，可以发现其必定大于其左上方的所有数字，也就是说我们可以把杨辉三角分成若干从右上到左下的斜列

我们简单一些考虑，能递推出来的就暴力递推，不能递推出来的找规律算出来就是了：

* 假设 $N$ 在第二斜列，那么显然最坏需要推 $N$ 层，不能承受，但显然第二斜列上数字对应行数，$N$ 即为数列的第 $\frac{N(N+1)}{2}+2$ 项
* 假设 $N$ 在第三斜列，那么最坏需要推 $\dbinom{r}{3} \leq {10}^9$ 解得 $r<=44722$ 层，还是不能承受。但我们发现第三斜列上的数字是逐行 $+4,+5,\cdots$ 的，所以一个循环遍历一下就好了
* 假设 $N$ 在第四斜列，那么最坏需要推 $\dbinom{r}{4} \leq {10}^9$ 解得 $r<=1819$ 层，这个是可以承受的，可以直接递推。另外显然第四斜列之后的斜列需要推的层数更少

所以我们的解题步骤即：首先递推出前 $1819$ 层，若发现 $N$ 则直接输出其位置。若没发现则遍历第三斜列。若还是没发现则答案为 $\frac{N(N+1)}{2}+2$。

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F9.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 双向排序

直接暴力排序的时间复杂度为 $O(mn\log{n})$ 的，只能得到 $60$ 分。

### 栈

我们可以发现，对于连续的几条同一种操作，显然覆盖范围最广的会覆盖掉其它操作，所以首先我们使用一个栈来维护操作，使得两种操作在栈内交替出现

然后，对于每个操作：

* 若该操作与上一条操作的覆盖范围不相交，则该操作无效
* 若该操作与上一条操作的覆盖范围相交，那么：
  * 若相交的范围在上一对操作的相交范围之内，则对相交部分进行翻转即可
  * 若相交的范围不在上一对操作的相交范围之内，则上一对操作无效

可以发现我们需要做的事情只有不停的翻转某区间，而且需要翻转的区间是在不停变小的，所以说范围外的值一旦确定就不会更改，直接填数就好了

时间复杂度 $O(n+m)$

### 线段树分裂合并

本题为 [[HEOI2016/TJOI2016]排序](https://www.luogu.com.cn/problem/P2824) 的弱化版，故解决方法相同：线段树分裂合并。

因为值域线段树上的数是有序的，故对于排序操作即通过线段树的分裂合并操作使用一个值域线段树维护操作区间即可。

时间复杂度 $O(m\log{n})$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F10.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 异或数列

因为是最后剩下的数字比较大的一方获胜，所以我们只需要从高到低考虑每个二进制位即可：如果某个二进制位上已经可以决出胜负，则结束；如果每一位都是平局则平局

对于所有数字的某位：

* 若 $1$ 的数量为偶数（包括 $0$ 个），因为所有的 $1$ 都要用上，所以必定平局；
* 若 $1$ 的数量为奇数且没有 $0$，因为当 $1$ 的数量为偶数时必定平局，所以当 $1$ 的数量为奇数时因为该先手方进行操作故先手方只需要给自己异或 $1$ 即可必胜。
* 若有 $0$ 的存在，因为 $0$ 异或一个数结果还是这个数所以选择用 $0$ 异或相当于换手
  * 若 $0$ 的数量为偶数，因为所有 $0$ 都要用上，所以相当于没有 $0$（换手再换手等于没换）
  * 若 $0$ 的数量为奇数，相当于只有 $1$ 个 $0$
    * 若 $1$ 的数量为 $1$，先手方只需要给自己异或上 $1$ 即可胜出
    * 若 $1$ 的数量为 $3,5,7,\cdots$，因为 $0$ 的存在导致后手方可以变为先手，所以本来的先手必胜变成了后手必胜

为什么当 $0$ 的数量为奇数 $1$ 的数量为 $1$ 时同样是奇数却是先手必胜呢？因为后手方利用换手获胜的必要条件是换手后还有 $1$ 进行操作，而 $1$ 的数量为 $1$ 时先手方给自己异或上 $1$ 后导致没有剩余的 $1$ 进行操作了，后手方的换手就变成了无用之举

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F11.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 左孩子右兄弟

显然对于一个结点我们只需要贪心地把其高度最高的子树尽量往下挂即可，极为简单的一道树上 DP

* 状态设计：$dp[u]$ 代表 $u$ 结点对高度的最大贡献
* 初始状态：$dp[leaf]=0$
* 状态转移：$$dp[u]=son[u].length + \max_{v \in son[u]}dp[v]$$
* 所求答案：$dp[rt]$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F12.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 括号序列

因为尽可能添加少的括号，所以添加的左、右括号不会出现如同 `()` 的形式，所以左括号与右括号添加的位置方案是相互独立的，不会相互影响。故总的方案数等于左括号的方案数 $\times$ 右括号的方案数。继续转换成只需要添加左括号：当需要添加右括号时将整个括号序列对称翻转，就转化为只需要添加左括号了

若以右括号为分割点将整个序列进行分割，因为分割后的子串中均为左括号，添加任意数目的左括号方案数均为一种，那么此时我们仅需考虑添加不同数量的左括号的方案数即可。采用 DP：

设 $n$ 为右括号数，$x$ 为共需添加多少个左括号，$b$ 代表当前至少需添加多少个左括号

* 状态设计：$dp[i][j]$ 代表只考虑前 $i$ 个右括号，需要添加 $j$ 个左括号的方案数
* 初始状态：$dp[1][~]=1$
* 状态转移：$$dp[i][j]=\sum_{k=b}^{x}dp[i-1][k]$$
* 所求结果：$dp[n][x]$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince1%2FC%2F13.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 分果果

待填坑……
