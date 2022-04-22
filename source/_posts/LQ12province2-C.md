---
title: 第十二届蓝桥杯省赛第二场 C/C++ 组题解
date: 2022-04-11 20:13:18
tags: 蓝桥杯
category: 题解
---

<script> embedpdf("题面", ["LQ12province2_CA", "LQ12province2_CB"]) </script>

## 求余

送分题

答案：$1$

## 双阶乘

只需要维护最后 $5$ 位即可，于是一个 `for` 搞定，边乘边对 ${10}^5$ 取模

答案：$59375$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F2.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 格点

两重 `for` 遍历 $x,y$ 值然后加一个判断计数即可

答案：$15698$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F3.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 整数分解

注意到所求为方案数，求方案数常见两种方法：组合数学或动态规划

本题两种方法均可

### 组合数学

显然题目即为在 $2021$ 个 $1$ 的 $2020$ 个空隙中插入 $4$ 个隔板的方案数

故答案为：$\binom{2020}{4}=691677274345$

### 动态规划

* 状态设计：$dp[i][j]$ 表示 $i$ 分成 $j$ 个正整数之和的方案数
* 初始状态：$dp[i][1] = 1$
* 转移方程：$$dp[i][j] = \sum_{k=1}^{i-1} dp[k][j-1]$$
* 所求结果：$dp[2021][5] = 691677274345$

答案：$691677274345$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F4.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 城邦

显然最小生成树裸题，下一道

答案：$4046$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F5.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 游戏

又是求方案数，发现这回不能用组合数学了，于是思路转向 DP

* 状态设计：$dp[i]$ 表示从 $i$ 开始写的方案数
* 初始状态：$dp[1] = 1$
* 转移方程：$$dp[i] = \sum_{d|i} dp[d]$$
* 所求结果：$$\sum_{i=1}^{n} dp[i]$$

发现直接递推的话，对于每个数都需要 $O(\sqrt n)$ 找约数，时间复杂度是 $O(n \sqrt n)$ 的，有些慢。于是我们采用刷表法优化，用前向状态去更新后继状态，即用每个数的 DP 值去更新其倍数的 DP 值。时间复杂度 $O(n \log n)$

答案：$1352184317599$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F6.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 特殊年份

模拟即可

使用 `std::string` 可以非常简单地写出程序

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F7.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 小平方

模拟……开个 `for` 循环即可

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F8.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 完全平方数

设 $A$ 为完全平方数，有：$A=x \times x$

设 $x$ 的标准质因数分解式为：

$$x={p_1}^{\alpha_1}{p_2}^{\alpha_2} \cdots {p_s}^{\alpha_s}$$

则 $A$ 的标准质因数分解式为：

$$A={p_1}^{2\alpha_1}{p_2}^{2\alpha_2} \cdots {p_s}^{2\alpha_s}$$

即 $A$ 的所有质因数都一定出现偶数次，故我们只需要对 $n$ 进行质因数分解，然后将所有出现了奇数次方的质因数乘在一起即为答案（将奇数补成偶数）。时间复杂度：$O(\sqrt n)$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F9.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 负载均衡

可以把分配任务想象成向计算机借了一些算力，时间到了后再还回去

于是我们开一个堆来维护要还回去的算力，对于每次操作先把时间到了的需要还回去的算力还回去，再判断此次能否借来算力，若能借来算力，把计算机的算力扣除了借走的算力后，在堆中打一个欠条。重复此流程即可，时间复杂度：$O(n \log n)$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F10.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 国际象棋

发现此题即 [[SCOI2005] 互不侵犯](https://www.luogu.com.cn/problem/P1896) 的加强版。把王换成马，即会跟上两行有关系罢了

状压 DP，把每行棋子放法用 01 串来表示，放了马为 1，没放为 0：

* 状态设计：$dp[i][p][q][j]$ 代表当前放到第 $i$ 行，放法为 $p$，上一行放法为 $q$，已经放了 $j$ 个马的方案数
* 初始状态：$dp[1][p][0][popcount(p)] = 1,p \in [0, 2^n-1]$ （同一行的马不会互相攻击所以可以随便放）
* 转移方程：$$dp[i][p][q][j] = \sum_{a} dp[i-1][q][a][j-popcount(p)],j \in [popcount(p),k],(q,p) \And (a,p) \text{不冲突}$$
* 所求结果：$$\sum_{p=0}^{2^n-1} \sum_{q=0}^{2^n-1} dp[m][p][q][k]$$

注意数据范围 $n<=6,~m<=100$，即 $2^m >> 2^n$，故我们把 $m$ 当做行来处理可以极大地缩小空间时间复杂度，最终时间复杂度：$O(m \times 2^n \times 2^n \times 2^n \times k) = O(8^nmk)$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F11.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 完美序列

**鸣谢：感谢 [@Tifa](https://tifa-233.xyz/) 大佬提供的主要思路**

读完题目，我们可以轻松获取如下三个结论（以下简称“$1$ 至 $n$ 的所有排列中长度正好为 $n$ 阶最大完美长度的最长完美子序列”为“最长完美子序列”：

1. $n$ 阶最大完美长度为 $\lfloor \log_2 n \rfloor + 1$
2. 每个“最长完美子序列”一定以 $1$ 为结尾
3. 每个“最长完美子序列”中一定只存在前一个数是后一个数的 $2$ 倍或 $3$ 倍，且 $3$ 倍只出现一次

第一个结论是显然的，因为下降最慢的完美序列为等比数列 $2^k,2^{k-1},\cdots,1$，故一个最大值为 $n$ 的完美序列的最大长度为 $\lfloor \log_2 n \rfloor + 1$

第二个结论采取反证法：若存在一个“最长完美子序列” $P$ 不以 $1$ 为结尾，那么一定存在一个完美子序列 $Q=(P,1)$ 比 $P$ 长，那么 $P$ 必然不是最长的，矛盾

第三个结论采取反证法：首先，若出现了 $3$ 倍以上，即以长度 $2$ 出现了 $3$ 倍以上（例：$5,1$），但我们至少可以用长度 $3$ 来出现 $4$ 倍（$4,2,1$），也就说说若出现了 $3$ 倍以上，那么此“最长完美子序列”必然不是最长的，矛盾；其次，若出现了两个 $3$ 倍，即以长度 $3$ 出现了 $9$ 倍（例：$9,3,1$），但我们可以用长度 $4$ 来出现 $8$ 倍（$8,4,2,1$），也就是说若出现了 $9$ 倍，那么此“最长完美子序列”必然不是最长的，矛盾

有了如上三个结论，我们就可以开始考虑如何解决这个问题了。设 $n$ 阶最大完美长度为 $len=\lfloor \log_2 n \rfloor + 1$，我们分情况讨论：

### “最长完美子序列”中不存在 $3$ 倍，即“最长完美子序列”为：$2^{len-1} \rightarrow 1$

此时“最长完美子序列”为等比数列 $2^{len-1},2^{len-2},\cdots,1$，由等比数列求和公式 $S_n=\cfrac{a_1-a_{n}q}{1-q}$，此情况下“最长完美子序列”的和为：

$$\cfrac{2^{len-1}-1 \times \frac{1}{2}}{1-\frac{1}{2}}=2^{len}-1$$

### “最长完美子序列”中存在 $3$ 倍，即“最长完美子序列”为：$3 \cdot 2^{len-2} \rightarrow 1$

注意：只有当 $n \geq 3 \cdot 2^{len-2}$ 时才会出现此情况

设 $S_{len}$ 为存在 $3$ 倍情况下所有长度为 $len$ 的“最长完美子序列”的和，则有：

![1](/images/LQ12province2-C/1.png)

递推预处理即可。以 $len=5$ 为例，上式的各部分如下：

![2](/images/LQ12province2-C/2.png)

当然，也可以使用此递推式的通项公式 $S_{len}=2^{len-1}(3len-4) - len + 2$ 直接算出结果

于是对于一个给定的 $n$，我们只需要判断一下是否可能出现第二种情况，根据上文所述即可获取所有“最长完美子序列”的和

注意“最长完美子序列”是 $1$ 至 $n$ 的所有排列的子序列，也就是说每个“最长完美子序列”会出现多次，其出现次数为 $\cfrac{A_n^n}{A_{len}^{len}}=\cfrac{n!}{len!}$，在计算答案时需要乘进去

为什么是 $\cfrac{A_n^n}{A_{len}^{len}}$ 呢？$1$ 至 $n$ 的所有排列共有 $A_n^n$ 个，而其中“最长完美子序列”的相对位置是不变的，所以除掉“最长完美子序列”的排列数 $A_{len}^{len}$

注意到出现了有理数取余，需要预处理阶乘及其逆元 $\left[ \cfrac{n!}{len!} \equiv n! \times (len!)^{-1} \pmod p \right]$。数据规模 $n \leq {10}^6$ 不是很大，采用 $O(n + \log p)$ 或者 $O(n \log n)$ 求逆元都可以。

若采用 $O(n \log n)$ 求逆元则总时间复杂度为 $O(n \log n + T)$；若采用 $O(n + \log p)$ 求逆元则总时间复杂度为 $O(n + \log p + T)$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F12%2Fprovince2%2FC%2F12.cpp&style=atom-one-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>
