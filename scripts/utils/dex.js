const { generateCalls, multiCall } = require('./multicall')

const getTokenInstance = async (contractAddress) => {
    return await ethers.getContractAt('MdexPair', contractAddress)
}

const fetchTokenInfo = async (tokenInfo) => {
    // 1. instance
    if (!tokenInfo.instance) {
        tokenInfo.instance = await getTokenInstance(tokenInfo.address)
    }

    // 2. decimals
    // if (!tokenInfo.decimals) {
    //     tokenInfo.decimals = await tokenInfo.instance.callStatic.decimals();
    // }

    // 3. symbol
    // if (!tokenInfo.symbol) {
    //     tokenInfo.symbol = await tokenInfo.instance.callStatic.symbol();
    // }

    // 4. totalSupply
    // if (!tokenInfo.totalSupply) {
    //     tokenInfo.totalSupply = await tokenInfo.instance.callStatic.totalSupply();
    // }

    return tokenInfo
}

/*
    @param tokenInfo
    const usdTokenInfo = {
        address: '0xa71edc38d189767582c38a3145b5873052c3e47a',
        decimals: 18
    }
* */
const getTokenPrice = async (lpAddress, usdTokenInfo, tokenInfo) => {
    await fetchTokenInfo(usdTokenInfo)
    await fetchTokenInfo(tokenInfo)

    const balanceUsdToken = await usdTokenInfo.instance.callStatic.balanceOf(
        lpAddress
    )
    const balanceToken = await tokenInfo.instance.callStatic.balanceOf(
        lpAddress
    )

    // should consider decimals
    const price =
        (balanceUsdToken / 10 ** usdTokenInfo.decimals) /
        (balanceToken / 10 ** tokenInfo.decimals)

    return {
        price,
        balanceUsdToken,
        balanceToken,
        lpTotalValue: balanceUsdToken.mul(2),
    }
}

const getTokenValueFromLp = async (lpAddress, basicTokenInfo) => {
    await fetchTokenInfo(basicTokenInfo)
    const balance = await basicTokenInfo.instance.callStatic.balanceOf(
        lpAddress
    )
    return balance.mul(2)
}

const getTokenValueFromLpAmount = async (lpTokenInfo, basicTokenInfo, lpAmount) => {
    await fetchTokenInfo(basicTokenInfo)
    await fetchTokenInfo(lpTokenInfo)

    const balance = await basicTokenInfo.instance.callStatic.balanceOf(
        lpTokenInfo.address
    )
    const lpTotalValue = balance.mul(2)
    const lpTotalSupply = await lpTokenInfo.instance.totalSupply()

    return lpAmount / lpTotalSupply * lpTotalValue
}

module.exports = {
    getTokenInstance,
    fetchTokenInfo,
    getTokenPrice,
    getTokenValueFromLp,
    getTokenValueFromLpAmount,
}
