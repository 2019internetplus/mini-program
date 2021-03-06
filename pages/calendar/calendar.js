
Page({
  data: {
    data: {},
    dayValues:[],
    selectedValue: {
      value: null,
      message: ''
    }
  },

  onLoad: function (options) {
    let _this = this;
    getSelectedValue(this);
    changeDate.call(this);
  },

  datePickerChangeEvent(e) {
    const date = new Date(Date.parse(e.detail.value));
    changeDate.call(this, new Date(date.getFullYear(), date.getMonth(), 1));
  }, 
  
  changeDateEvent(e) {
    const { year, month } = e.currentTarget.dataset;
    changeDate.call(this, new Date(year, parseInt(month) - 1, 1));
  }, 

  dateClickEvent(e) {
    const { year, month, date } = e.currentTarget.dataset;
    const { data } = this.data;
    let selectDateText = '';

    data['selected']['year'] = year;
    data['selected']['month'] = month;
    data['selected']['date'] = date;

    //选择数据
    for(let i = 0; i < this.data.dayValues.length; i++){
      let time = new Date(this.data.dayValues[i].time * 1000);
      if(time.getFullYear() === year && time.getMonth() + 1 === month && time.getDate() === date ){
        this.setData({
          selectedValue: {
            value: this.data.dayValues[i].total_value,
            message: this.data.dayValues[i].message || "",
          } 
        });
        break;
      }
      this.setData({
        selectedValue: {
          value: null,
          message: ""
        }
      });
      console.log(this.data.selectedValue);
    }
    this.setData({ data: data });
    console.log(changeDate);
    changeDate.call(this, new Date(year, parseInt(month) - 1, date));
  },
})

/**
 * 变更日期数据
 * @param {Date} targetDate 当前日期对象
 */
function changeDate(targetDate) {
  let date = targetDate || new Date();
  let currentDateObj = new Date();

  let showMonth, showYear, showDay, 
    showDate,showMonthFirstDateDay, 
    showMonthLastDateDay, showMonthDateCount; 

  showDate = date.getDate();//当前显示第几天
  showMonth = date.getMonth() + 1;
  showYear = date.getFullYear();
  showDay = date.getDay(); //当前显示星期
  showMonthDateCount = new Date(showYear, showMonth, 0).getDate();
  date.setDate(1);
  showMonthFirstDateDay = date.getDay(); //当前显示月份第一天的星期
  date.setDate(showMonthDateCount);
  showMonthLastDateDay = date.getDay(); //当前显示月份最后一天的星期  

  let beforeDayCount = 0, beforeYear, 
    beforMonth, afterYear, afterMonth, 
    afterDayCount = 0, beforeMonthDayCount = 0; 

  beforMonth = showMonth === 1 ? 12 : showMonth - 1;//上一个月月份
  beforeYear = showMonth === 1 ? showYear - 1 : showYear;//上一个月年份
  afterMonth = showMonth === 12 ? 1 : showMonth + 1;//下个月月份
  afterYear = showMonth === 12 ? showYear + 1 : showYear;//下个月年份
  
  if (showMonthFirstDateDay != 0)//获取上一页的显示天数
    beforeDayCount = showMonthFirstDateDay - 1;
  else
    beforeDayCount = 6;

  if (showMonthLastDateDay != 0)//获取下页的显示天数
    afterDayCount = 7 - showMonthLastDateDay;
  else
    showMonthLastDateDay = 0;

  //如果天数不够6行，则补充完整
  let tDay = showMonthDateCount + beforeDayCount + afterDayCount;
  if (tDay <= 35)
    afterDayCount += (42 - tDay); //6行7列 = 42

  let selected = this.data.data['selected'] || { year: showYear, month: showMonth, date: showDate };
  let selectDateText = selected.year + '年' + formatNumber(selected.month) + '月' + formatNumber(selected.date) + '日';
  
  let data = [];
  data = {
    currentDate: currentDateObj.getDate(), //当天日期第几天
    currentYear: currentDateObj.getFullYear(), //当天年份
    currentDay: currentDateObj.getDay(), //当天星期
    currentMonth: currentDateObj.getMonth() + 1, //当天月份
    showMonth: showMonth, //当前显示月份
    showDate: showDate, //当前显示月份的第几天 
    showYear: showYear, //当前显示月份的年份
    beforeYear: beforeYear, //当前页上一页的年份
    beforMonth: beforMonth, //当前页上一页的月份
    afterYear: afterYear, //当前页下一页的年份
    afterMonth: afterMonth, //当前页下一页的月份
    selected: selected,
    selectDateText: selectDateText
  };

  let dates = [];
  let _id = 0; //为wx:key指定

  if (beforeDayCount > 0) {
    beforeMonthDayCount = new Date(beforeYear, beforMonth, 0).getDate();
    for (let fIdx = 0; fIdx < beforeDayCount; fIdx++) {
      dates.unshift({
        _id: _id,
        year: beforeYear,
        month: beforMonth,
        date: beforeMonthDayCount - fIdx
      });
      _id++;
    }
  }

  for (let cIdx = 1; cIdx <= showMonthDateCount; cIdx++) {
    dates.push({
      _id: _id,
      active: (selected['year'] == showYear && selected['month'] == showMonth && selected['date'] == cIdx), //选中状态判断
      year: showYear,
      month: showMonth,
      date: cIdx,
      background: ''
    });
    _id++;
  }

  if (afterDayCount > 0) {
    for (let lIdx = 1; lIdx <= afterDayCount; lIdx++) {
      dates.push({
        _id: _id,
        year: afterYear,
        month: afterMonth,
        date: lIdx
      });
      _id++;
    }
  }
  data.dates = dates;
  this.setData({ data: data, pickerDateValue: showYear + '-' + showMonth });
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function getSelectedValue($this){
   const reqData = {
     openid: wx.getStorageSync('openid'),
     token: wx.getStorageSync('token')
   };
   wx.request({
     url: 'https://api.xumengli.cn/em/v0.1/getAll?openid=' + reqData.openid + '&token=' + reqData.token,
     method: 'GET',
     success: (res) =>{
       if(res.data.code == 100){
         $this.setData({
           dayValues: res.data.data
         });
       }else{
         wx.showModal({
           title: '错误',
           content: res.data.message,
         })
       }
     },
     fail: (err) =>{
       wx.showModal({
         title: '错误',
         content: err.errMsg,
       })
       console.log(err);
     }
   })
}