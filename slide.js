// 轮播图 js
var nextIndex = function(slide, set) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // 上一张 set 是 -1;下一张 set 是 1
    var i = (numberOfImgs + activeIndex + set) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.bin-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click')
        var button = event.target
        var slide = button.parentElement
        var set = Number(button.dataset.set)
        var index = nextIndex(slide, set)
        showImage(slide, index)
    })
}

var showImage = function(slide, index) {
    log('slide', index, slide)
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    var nextSelector = '#id-binimage-' + String(nextIndex)
    var className = 'bin-active'
    removeClassAll(className)
    log('remove class', nextSelector)
    var img = e(nextSelector)
    log('next img')
    img.classList.add(className)

    // 切换小圆点
    // 删除当前小圆点的 class
    removeClassAll('bin-white')
    // 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('bin-white')
}

var bindEventIndicator = function() {
    var selector = '.bin-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        var self = event.target
        var index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        var slide = self.closest('.bin-slide')
        showImage(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.bin-slide')
    // 默认播放下一张
    var index = nextIndex(slide, 1)
    showImage(slide, index)
}

// 自动播放
var autoPlay = function() {
    var interval = 3000
    var clockId = setInterval(function() {
        playNextImage()
    }, interval)
    // 鼠标移入图片清除自动播放
    var mouseInPic = e('.bin-slide-image')
    bindEvent(mouseInPic, 'mouseover', function() {
        log('*** 鼠标移入图片')
        clearInterval(clockId)
    })
    // 鼠标移出恢复自动播放
    bindEvent(mouseInPic, 'mouseout', function() {
        log('*** 鼠标移出图片')
        clockId = setInterval(function() {
            playNextImage()
        }, interval)
    })
}

var __main = function() {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}

__main()
