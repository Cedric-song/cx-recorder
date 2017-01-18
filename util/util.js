function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

/*  
 *  
 *  格式化时间
 *  传入10位或者13位时间戳，返回格式yyyy/mm/dd hh:mm:ss
 *  @ time : number 
 *  
 */
function formatDate(time) {
  let _time = time
  if (typeof _time !== 'number' || _time < 0) {
    return _time
  }
  if (_time.toString().length === 10) {
    _time = parseInt(_time.toString().concat('000'))
  }

  let date = new Date(_time)

  return ([date.getFullYear(), date.getMonth() + 1, date.getDate()]).map(function(item) {
    let _item = item.toString()
    return _item[1] ? _item : '0'.concat(_item)
  }).join("/").concat(" ").concat(([date.getHours(), date.getMinutes(), date.getSeconds()]).map(function(item) {
    let _item = item.toString()
    return _item[1] ? _item : '0'.concat(_item)
  }).join(":"))
}

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  formatDate: formatDate
}