//杜绝重复点击
  function avoidReClick($this) {
    var str = '';
    str += '<div class="j-fade"></div>'
    $this.parent().css({
      'position' : 'relative'
    })
    $this.after(str)
    $this.next('.j-fade').css({
      'position': 'absolute',
      'zIndex': '10',
      'width': $this.width()+14,
      'height': $this.height()+10,
      'top': '-1px',
      'left': '-1px',
      'background': 'rgba(0, 0, 0,.1)'
    })
  }
  //恢复点击
  function resetClick($this) {
    $this.next('.j-fade').remove()
  }