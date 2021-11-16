import Express from 'express'
import { responseClient } from './common/utils'
import { handleCountData } from './common/index'
import BillType from '../models/billTypeEnum'
import BillDetail from '../models/billDetail'
import Register from '../models/register'

const router = Express.Router()

router.post('/login', function(req, res) {
  const { objName, password } = req.body
  Register.find({'objName': objName, 'password': password}).then(data => {
    if (data.length !== 0) {
      responseClient(res, 200, 200, '请求成功', data)
    } else {
      responseClient(res, 200, 101, '请输入正确的用户名和密码进行登录', data)
    }
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/register', function(req, res) {
  const { objName, password } = req.body
  Register.find({'objName': objName}).then(data => {
    if (data.length === 0) { // 未有相同账号注册
      const tempData = new Register({
        objName,
        password,
        imgPath: ''
      })
      tempData.save().then(data => {
        responseClient(res, 200, 200, '请求成功', data)
      }).catch(err => {
        responseClient(res)
      })
    } else {
      responseClient(res, 200, 102, '该账号已注册', data)
    }
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/getMemberInfo', function(req, res) {
  const { userId } = req.body
  Register.find({'_id': userId}).then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/typeData', function (req, res) {
  BillType.find().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/createBill', function (req, res) {
  const { objName, objType, objPrice, objDate, userId } = req.body
  const tempData = new BillDetail({
    objName,
    objType,
    objPrice,
    objDate,
    userId
  })
  tempData.save().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/billDetailList', function (req, res) { // 根据类型过滤出对应的数据
  const { userId } = req.body
  BillDetail.find({ userId: userId }).then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/delListData', (req, res) => {
  const { id } = req.body;
  BillDetail.remove({ '_id': id }).then(data => {
    responseClient(res, 200, 200, '删除成功', data)
  }).cancel(err => {
    responseClient(res);
  })
})

// forTimeCount
router.post('/forTimeCount', function (req, res) { // 根据时间区间得到数据，并累加
  const { startDate, endDate, userId } = req.body
  BillDetail.find({ objDate: {$lte:endDate, $gte:startDate}, userId: userId }).then(data => {
    BillType.find().then(typeData => {
      const tempData = handleCountData(data, typeData)
      responseClient(res, 200, 200, '请求成功', tempData)
    })
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/forYearCount', function(req, res) { // 根据年份计算每个类型每个月份的值
  const { startDate, endDate, userId } = req.body
  BillDetail.find({ objDate: {$lte:endDate, $gte:startDate}, userId: userId }).then(data => {
    BillType.find().then(typeData => {
      let tempData = {
        total: []
      }
      typeData.forEach((item) => {
        tempData[item.code] = []
      })
      for (let i = 1; i < 13; i++) {
        for (let j in tempData) {
          tempData[j].push(0)
        }
        data.forEach((items) => {
          const tag = items.objDate.slice(5, 7) // 取得数据的月份
          if (Number(tag) === i) {
            tempData[items.objType][i - 1] += Number(items.objPrice)
            tempData.total[i - 1] += Number(items.objPrice)
          }
        })
      }
      responseClient(res, 200, 200, '请求成功', tempData)
    })
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/initTypeList', function (req, res) { // 初始化类型，可通过postman，无需写这个接口
  const { code, label } = req.body
  const tempData = new BillType({
    code,
    label
  })
  tempData.save().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

module.exports = router