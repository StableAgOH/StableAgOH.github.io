---
title: 第十三届蓝桥杯省赛 C/C++ B 组题解
date: 2022-04-22 14:04:53
tags: 蓝桥杯
category: 题解
---

<script> embedpdf("题面", ["LQ13province_CB"]) </script>

## 九进制转十进制

送分题，推荐使用 `std::stoi` 函数，自带进制转换

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FA.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 顺子日期

题面写的很差，对“顺子”没有一个准确的定义（逆序是否算顺子？包括 $0$ 的是否算顺子？）

若顺子定义为：“从小到大连续三个大于等于 $0$ 的数字”，则本题做法如下：

首先我们发现年份部分 $2022$ 是无用的，因为其内部不存在顺子，且最后一位也无法作为顺子的一部分（不存在 $34$ 月），故我们只看月日部分即可。

若顺子位置在前 $3$ 位，则：

* 月份为 $01$，那么日期可以为 $20 \sim 29$，共 $10$ 个；
* 月份为 $12$，那么日期可以为 $30$ 或 $31$，共 $2$个。

若顺子位置在后 $3$ 位，则：

* 日期为 $12$，那么月份可以为 $10$，共 $1$ 个；
* 日期为 $23$，那么月份可以为 $01$ 或 $11$，共 $2$ 个。

注意在以上过程中我们计算了 $0123$ 两次，故最终结果为 $10+2+1+2-1=14$

## 刷题统计

按照题意模拟即可

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FC.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 修剪灌木

当一棵灌木被修剪后其高度会变为 $0$，而下次再次碰到此灌木时其高度达到最高

故对于中点左侧的灌木来说，其最大高度为其右侧灌木数量乘 $2$；对于中点右侧的灌木来说，其最大高度为其左侧灌木数量乘 $2$。

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FD.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## X 进制减法

### 题面解释

首先我们解释一下题面里的 $321$ 转换后为什么是 $65$

设每位的进制为 $x_1,x_2,\cdots,x_n$，一个 $X$ 进制数字 $P$ 每位的数字为 $p_1,p_2,\cdots,p_n$，即 $P = \overline{p_{1}p_{2} \cdots p_{n}}$

则其十进制值为 $p_1(x_{2}x_{3} \cdots x_{n}) + p_2(x_{3}x_{4} \cdots x_{n}) + \cdots + p_n$

即：

$$P = \sum_{i=1}^{n} \left( p_i \prod_{j=i+1}^{n}x_j \right)$$

故 $(321)_X = 3 \times (10 \times 2) + 2 \times 2 + 1 = 65$

### 解题

设每位的进制为 $x_1,x_2,\cdots,x_n$，$A$ 每位的数字为 $a_1,a_2,\cdots,a_n$，$B$ 每位的数字为 $b_1,b_2,\cdots,b_m~(m \leq n)$。

若 $m<n$，为了方便，我们在 $B$ 数字前面补前导 $0$，使得其长度与 $A$ 一样。则 $B$ 每位的数字为 $b_1,b_2,\cdots,b_n$。

则：

$$
\begin{aligned}
    A-B &= \sum_{i=1}^{n} \left( a_i \prod_{j=i+1}^{n}x_j \right) - \sum_{i=1}^{n} \left( b_i \prod_{j=i+1}^{n}x_j \right) \\
        &= \sum_{i=1}^{n} \left( (a_i-b_i) \prod_{j=i+1}^{n}x_j \right)
\end{aligned}
$$

在 $a_i$ 与 $b_i$ 都给定的情况下，可以发现当 $\prod_{j=i+1}^{n}x_j$ 越小时，$A-B$ 越小，也就是每位的进制都取到最小值时，$A-B$ 最小

注意题面的规定“最低为二进制”与“每一数位上的数字要小于其进制”，故每位的进制最小只能取到 $\max(2, a_i+1, b_i+1)$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FE.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 统计子矩阵

首先有一个很显然的二维前缀和暴力，但时间复杂度为 $O(n^4)$，对于 $500$ 的数据范围显然无法接受

我们发现，子矩阵是连续的，故本题其实即双指针算法维护区间信息的模板题的二维版本

> **双指针算法维护区间信息的模板题：[LeetCode 713](https://leetcode-cn.com/problems/subarray-product-less-than-k/)**
> 给定一个正整数数组 $nums$ 和整数 $k$ 。
> 请找出该数组内乘积小于 $k$ 的连续的子数组的个数。

在一维数组中使用双指针时，两个指针指向的是零维的点，那么在二维数组中使用双指针时，双指针自然指向的就是一维的线

于是我们只需要遍历这两根一维的线，扫双指针即可。而两线之间元素的和的维护可以使用前缀和轻松解决

一个循环遍历两线的左边界，一个循环遍历两线的右边界，一个循环在限定的左右边界范围内在纵方向扫双指针，时间复杂度 $O(n^3)$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FF.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 积木画

洛谷原题：[覆盖墙壁](https://www.luogu.com.cn/problem/P1990)

发现问题要求方案数，而求方案数的题目一般就是两种做法：组合数学或者动态规划。本题显然不像是可以用组合数学解决的，考虑动态规划

以下提供两种动态规划的方法

### 线性 DP

#### 朴素递推

* 状态设计：$dp[i]$ 代表前 $i$ 列都被填满时的方案数
* 初始状态：$dp[0] = 1$
* 转移方程：
  * 若最后一个放的是竖条
    * $dp[i-1]+$ 第 $i$ 列放一个竖条 $=dp[i]$

      ![1-1](/images/LQ13province-CB/G-1-1.png)
    * $dp[i-2]+$ 第 $i-1$ 与 第 $i$ 列放两个横条 $=dp[i]$

      ![1-2](/images/LQ13province-CB/G-1-2.png)
  * 若最后一个放的是 L 条，最后一个放的 L 条有两种放法，故答案乘 $2$
    * $dp[i-3]+$ 放两个 L 条 $=dp[i]$

      ![1-3](/images/LQ13province-CB/G-1-3.png)
    * $dp[i-4]+$ 两个 L 条一个横条 $=dp[i]$

      ![1-4](/images/LQ13province-CB/G-1-4.png)
    * $dp[i-5]+$ 两个 L 条两个横条 $=dp[i]$

      ![1-5](/images/LQ13province-CB/G-1-5.png)
    * $\vdots$

  即：
  
  $$
      \begin{aligned}
          dp[i] &= dp[i-1]+dp[i-2]+2\sum_{j=0}^{i-3}dp[j] \\
                &= dp[i-1]+\left( dp[i-2]+dp[i-3]+2\sum_{j=0}^{i-4}dp[j] \right)+dp[i-3] \\
                &= 2dp[i-1] + dp[i-3]
      \end{aligned}
  $$
* 所求结果：$dp[n]$

可以滚动数组优化

#### 矩阵加速

显然以上转移方程可以矩阵加速：

$$
    \begin{cases}
        2 \times dp[i-1] + 0 \times dp[i-2] + 1 \times dp[i-3] = dp[i] \\
        1 \times dp[i-1] + 0 \times dp[i-2] + 0 \times dp[i-3] = dp[i-1] \\
        0 \times dp[i-1] + 1 \times dp[i-2] + 0 \times dp[i-3] = dp[i-2]
    \end{cases}
    \Rightarrow
    \begin{bmatrix}
        2 & 0 & 1 \\
        1 & 0 & 0 \\
        0 & 1 & 0
    \end{bmatrix}
    \begin{bmatrix}
        dp[i-1] \\
        dp[i-2] \\
        dp[i-3]
    \end{bmatrix}
    =
    \begin{bmatrix}
        dp[i] \\
        dp[i-1] \\
        dp[i-2]
    \end{bmatrix}
$$

当 $n>3$ 时：

$$
    \begin{bmatrix}
        dp[i] \\
        dp[i-1] \\
        dp[i-2]
    \end{bmatrix}
    =
    \begin{bmatrix}
        2 & 0 & 1 \\
        1 & 0 & 0 \\
        0 & 1 & 0
    \end{bmatrix}^{n-3}
    \begin{bmatrix}
        dp[3] \\
        dp[2] \\
        dp[1]
    \end{bmatrix}
    =
    \begin{bmatrix}
        2 & 0 & 1 \\
        1 & 0 & 0 \\
        0 & 1 & 0
    \end{bmatrix}^{n-3}
    \begin{bmatrix}
        5 \\
        2 \\
        1
    \end{bmatrix}
$$

### 状压 DP

$j=(0,1)$ 代表第一行是否被填充，$k=(0,1)$ 代表第二行是否被填充

* 状态设计：$dp[i][j][k]$ 代表前 $i-1$ 列已经填满，第 $i$ 列的填法为 $(j,k)$ 时的方案数
* 初始状态：$dp[1][0][0] = 1$
* 转移方程：
  若第 $i$ 列没被填满，我们**向第 $i$ 列上放置积木**将其填满，而在这个填充的过程中可能会影响到第 $i+1$ 列：
  * $dp[i][0][0] \rightarrow dp[i+1][0][0]$

    ![2-1](/images/LQ13province-CB/G-2-1.png)
  * $dp[i][0][0] \rightarrow dp[i+1][1][1]$

    ![2-2](/images/LQ13province-CB/G-2-2.png)
  * $dp[i][0][0] \rightarrow dp[i+1][0][1]$

    ![2-3](/images/LQ13province-CB/G-2-3.png)
  * $dp[i][0][0] \rightarrow dp[i+1][1][0]$

    ![2-4](/images/LQ13province-CB/G-2-4.png)
  * $dp[i][0][1] \rightarrow dp[i+1][1][0]$

    ![2-5](/images/LQ13province-CB/G-2-5.png)
  * $dp[i][0][1] \rightarrow dp[i+1][1][1]$

    ![2-6](/images/LQ13province-CB/G-2-6.png)
  * $dp[i][1][0] \rightarrow dp[i+1][0][1]$

    ![2-7](/images/LQ13province-CB/G-2-7.png)
  * $dp[i][1][0] \rightarrow dp[i+1][1][1]$

    ![2-8](/images/LQ13province-CB/G-2-8.png)
  * $dp[i][1][1] \rightarrow dp[i+1][0][0]$

    ![2-9](/images/LQ13province-CB/G-2-9.png)
* 所求结果：$dp[n+1][0][0]$

每列状态只与上一列有关，故可以滚动数组优化

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FG.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 扫雷

乍一看很像 [[NOIP2017 提高组] 奶酪](https://www.luogu.com.cn/problem/P3958)，但一看数据范围发现 $O(n^2)$ 的时间复杂度过 $5 \times {10}^4$ 有点悬

但是注意到 $r$ 最大只有 $10$，故对于一个结点我们可以枚举 $r$ 来获取其能炸到的位置，所以直接搜索就是了。需要注意的是 $x,y \leq {10}^9$，我们不能用二维数组存地图，需要使用哈希表 `std::unordered_map`。另外，`std::pair` 没有哈希，需要我们自己写一个哈希函数，方法是特化仿函数 `std::hash`

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FH.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 李白打酒加强版

又是求方案数，一看又不太可能是组合数学，于是 DP。总共就三个变量：店、花、酒的数量，状态设计很简单：

* 状态设计：$dp[i][j][k]$ 代表李白遇到了 $i$ 个店，$j$ 个花，手上还剩 $k$ 壶酒的方案数
* 初始状态：$dp[0][0][2] = 1$
* 转移方程：$$dp[i][j][k] = dp[i-1][j][k/2]+dp[i][j-1][k+1]$$

    注意：

    1. 只有 $i \neq 0$ 且 $2|k$ 时才计算 $dp[i-1][j][k/2]$ 这个状态
    2. 只有 $j \neq 0$ 时才计算 $dp[i][j-1][k+1]$ 这个状态
    3. $k$ 这一维度只需要遍历到 $m-j$ 就足够了，因为每遇到一个花只会喝掉一壶酒，若当前酒的数量大于剩余花的数量则即使之后遇到的都是花酒都喝不完，对最后的答案没有贡献
* 所求结果：$dp[n][m-1][1]$
  
  注意不是 $dp[n][m][0]$，因为这样就包含了最后一个单位是店的状态，与题目要求矛盾

<details>
<summary>递推</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FI1.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

<details>
<summary>记忆化搜索</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FI2.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>

## 砍竹子

其实就是 [[NOIP2018 提高组] 铺设道路](https://www.luogu.com.cn/problem/P5019) 的加强版而已

回想一下铺设道路的做法：对于除了第一个坑的每一个坑来说，若坑深度大于前一个坑的深度，那么其对答案的贡献就是两坑高度之差，最终答案就是第一个坑的深度加上每个坑对于答案的贡献

为什么这样做是对的呢？因为在填一下小坑的时候势必会连带着填一下大坑，而小坑填满后大坑剩余的高度就是两坑高度之差了

我们把这个想法反过来想，也就是：先把大坑填到与小坑一样的高度，然后大小坑一起填

注意，为什么两个一样深的坑可以一起填？因为每次填土后两坑的高度还是一样的，也就是两坑填充过程中有一个公共的后缀

回到本题，对于某根竹子来说，若其与前一根竹子在砍的过程中的高度有一个公共的后缀的话，那么不就跟填坑是一样的道理嘛

注意此时并没有类似“若坑深度大于前一个坑的深度”的限制，因为对于填坑来说，不满足这个条件的坑一定会被填其他坑的过程中顺带填掉。但是砍竹子不是这样，高的竹子并不一定会有矮的竹子被砍的过程中的高度的后缀，也就是不满足前述条件的竹子不一定会被顺带砍掉

故某根竹子对于答案的贡献即为其被砍过程中与前一根竹子的公共后缀之外的部分的高度的数量

故 $O(kn)$ 扫一遍即可，$k$ 为砍竹子的复杂度，高度最大为 ${10}^{18}$，最多砍 $6$ 刀就砍到 $1$ 了，故 $k$ 最大为 $6$

<details>
<summary>Code</summary>
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FStableAgOH%2Fsolved-problems%2Fblob%2Fmain%2Flq%2F13%2Fprovince%2FCB%2FJ.cpp&style=a11y-dark&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</details>
