---
title: 树上随机游走问题
date: 2022-08-31 16:37:43
tags: [树, 概率 DP]
category: 笔记
---

## 需要用到的定义

* $d(u)$：$u$ 结点的度数
* $w(u,v)$：$u$ 结点与 $v$ 结点之间的边的边权
* $p_u$：$u$ 结点的父结点
* ${son}_u$：$u$ 结点的子结点集合
* ${sibling}_u$：$u$ 结点的兄弟结点集合

## 向父结点走的期望距离

设 $f(u)$ 代表 $u$ 结点走到其父结点 $p_u$ 的期望距离，则有：

$$f(u) = \cfrac{w(u,p_u) + \sum\limits_{v \in {son}_u}(w(u,v) + f(v) + f(u))}{d(u)}$$

化简如下：

$$
\begin{aligned}
    f(u) &= \cfrac{w(u,p_u) + \sum\limits_{v \in {son}_u}(w(u,v) + f(v) + f(u))}{d(u)} \\
            &= \cfrac{w(u,p_u) + \sum\limits_{v \in {son}_u}(w(u,v) + f(v)) + (d(u)-1)f(u)}{d(u)} \\
            &= w(u,p_u) + \sum\limits_{v \in {son}_u}(w(u,v) + f(v))
\end{aligned}
$$

分子中的前半部分代表直接走向了父结点，后半部分代表先走向了子结点再由子结点走回来然后再向父结点走；分母 $d(u)$ 代表从 $u$ 结点走向其任何邻接点的概率相同。

初始状态为 $f(leaf) = 1$。

当树上所有边的边权都为 $1$ 时，上式可化为：

$$f(u) = 1 + \sum\limits_{v \in {son}_u}(1 + f(v))$$

化简如下：

$$
\begin{aligned}
    f(u) &= 1 + \sum\limits_{v \in {son}_u}(1 + f(v)) \\
            &= 1 + (d(u)-1) + \sum\limits_{v \in {son}_u}f(v) \\
            &= d(u) + \sum\limits_{v \in {son}_u}f(v)
\end{aligned}
$$

即 $u$ 子树的所有结点的度数和，也即 $u$ 子树大小的两倍 $-1$（每个结点连向其父亲的边都有且只有一条，除 $u$ 与 $p_u$ 之间的边只有 $1$ 点度数的贡献外，每条边会产生 $2$ 点度数的贡献）。

## 向子结点走的期望距离

设 $g(u)$ 代表 $p_u$ 结点走到其子结点 $u$ 的期望距离，则有：

$$g(u) = \cfrac{w(p_u,u) + \left(w(p_u,p_{p_u})+g(p_u)+g(u)\right) + \sum\limits_{s \in {sibling}_u}(w(p_u,s)+f(s)+g(u))}{d(p_u)}$$

分子中的第一部分代表直接走向了子结点 $u$，第二部分代表先走向了父结点再由父结点走回来然后再向 $u$ 结点走，第三部分代表先走向 $u$ 结点的兄弟结点再由其走回来然后再向 $u$ 结点走；分母 $d(u)$ 代表从 $u$ 结点走向其任何邻接点的概率相同。

化简如下：

$$
\begin{aligned}
    g(u) &= \cfrac{w(p_u,u) + \left(w(p_u,p_{p_u})+g(p_u)+g(u)\right) + \sum\limits_{s \in {sibling}_u}(w(p_u,s)+f(s)+g(u))}{d(p_u)} \\
         &= \cfrac{w(p_u,u) + w(p_u,p_{p_u}) + g(p_u) + \sum\limits_{s \in {sibling}_u}(w(p_u,s)+f(s))+(d(p_u)-1)g(u)}{d(p_u)} \\
         &= w(p_u,u) + w(p_u,p_{p_u}) + g(p_u) + \sum\limits_{s \in {sibling}_u}(w(p_u,s)+f(s))
\end{aligned}
$$

初始状态为 $g(root) = 0$。

当树上所有边的边权都为 $1$ 时，上式可化为：

$$g(u) = 1 + 1 + g(p_u) + \sum\limits_{s \in {sibling}_u}(1+f(s))$$

化简如下：

$$
\begin{aligned}
    g(u) &= 1 + 1 + g(p_u) + \sum\limits_{s \in {sibling}_u}(1+f(s)) \\
         &= 2 + g(p_u) + (d(p_u)-2) + \sum\limits_{s \in {sibling}_u}f(s) \\
         &= g(p_u) + d(p_u) + \sum\limits_{s \in {sibling}_u}f(s)
\end{aligned}
$$
