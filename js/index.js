/**
 * 取双色球单个蓝球的数字
 * 数值取值范围为1-16
 * @returns {Number} 返回一个蓝球数字
 */
function getBlueBall() {
    // 取0-16的随机数
    const randomNumber = Math.random() * 16;
    // 向下取整
    const randomNumberFloor = Math.floor(randomNumber);
    // 如果数字无效，则重新取值；
    if(randomNumberFloor < 1 || randomNumberFloor > 16){
        return getBlueBall();
    }
    return randomNumberFloor;
}

/**
 * 取双色球单个红球的数字
 * 数值取值范围为1-33
 * @returns {Number} 返回一个红球数字
 */
function getRedBall() {
    // 取0-33的随机数
    const randomNumber = Math.random() * 33;
    // 向下取整
    const randomNumberFloor = Math.floor(randomNumber);
    // 如果数字无效，则重新取值；
    if(randomNumberFloor < 1 || randomNumberFloor > 33){
        return getRedBall();
    }
    return randomNumberFloor;
}

/**
 * 取所有的红球
 * @returns {Array} 返回红球数组
 */
function getAllRedBall (){
    // 取球次数
    let count = 6;
    const doubleColorBall = [];
    for(let i = 0;i < count; i++ ){
        const num = getRedBall()
        // 如果取得的球已经存在，舍弃当前数字，取球次数加1
        if (doubleColorBall.indexOf(num) > 0) {
            count ++;
        } else {
            doubleColorBall.push(num);
        }
    }
    return doubleColorBall;
}

/**
 * 获取一组双色球号码
 * @returns {Array} 返回号码数组
 */
function getDoubleColorBall() {
    // 取6个红球
    const doubleColorBall = getAllRedBall().sort((a,b) => a-b);
    // 取1个蓝球
    doubleColorBall.push(getBlueBall());
    return doubleColorBall;
}


new Vue({
    el: "#app",
    data() {
        return {
            // 已生成的双色球组
            doubleColorBall: [],
            // 双色球数字汇总
            ballNumberCollectForRed: [],
            ballNumberCollectForBlue: [],
            arr: [],
        }
    },
    methods: {
        getDoubleColorBall() {
            this.doubleColorBall.push(getDoubleColorBall());
            this.ballNumberCollect();
        },
        ballNumberCollect() {
            const NumberCollectForRed = [];
            const NumberCollectForBlue = [];
            for (const item of this.doubleColorBall) {
                for (const it of item) {
                    const index = item.lastIndexOf(it);
                    if (index < item.length - 1) {
                        if (NumberCollectForRed.indexOf(it) == -1) {
                            NumberCollectForRed.push(it)
                        }
                    } else {
                        if (NumberCollectForBlue.indexOf(it) == -1) {
                            NumberCollectForBlue.push(it)
                        }
                    }
                }
            }
            this.ballNumberCollectForRed = NumberCollectForRed.sort((a,b) => a-b);
            this.ballNumberCollectForBlue = NumberCollectForBlue.sort((a,b) => a-b);
        },
        // 判断数组是否有重复
        isRepead(array){
            for (let i = 0; i < array.length; i++) {
                const e = array[i];
                if(array.lastIndexOf(e) !== i){
                    return true;
                }
            }
            return false;
        }
    }
})
