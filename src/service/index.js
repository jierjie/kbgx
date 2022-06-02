import Http from './request'

// 过滤 单维对象
function filterQuery(query) {
  const q = {
    ...query
  }
  for (const k in q) {
    if (q[k] === null || q[k] === undefined || q[k].trim() === '') {
      q[k] = null
    } else if (typeof q[k] === 'string') {
      q[k] = q[k].trim()
    }
  }
  return q
}

const ClassService = {
  // 获取课程信息（课程内容）
  getClass: topic => {
    return Http.get(`/cooper/class/getClass?topic=${topic}`)
  },
  // GET  获取模块分类（一级菜单名称）
  getModules: () => {
    return Http.get(`/cooper/class/getModules`)
  },
  // GET  获取课程分类（二级菜单名称）
  getTopics: () => {
    return Http.get(`/cooper/class/getTopics`)
  },
  // GET /cooper/class/log_open 频记录打开
  logOpen: data => {
    return Http.get(
      `/cooper/class/log_open?userId=${data.userId}&classId=${data.classId}`
    )
  },
  // 视频记录时长 GET /cooper/class/log_update
  logUpdate: data => {
    return Http.get(
      `/cooper/class/log_update?id=${data.id}&watchTime=${data.watchTime}`
    )
  },
  // GET /cooper/class/validate 验证邀请码
  validate: data => {
    return Http.get(
      `/cooper/class/validate?classId=${data.classId}&code=${data.code}`
    )
  }
}
const UserService = {
  // POST /user/changePwd 修改密码
  changePwd: data => {
    return Http.post(`/user/changePwd`, data)
  },
  // POST /user/login login
  login: data => {
    return Http.post(`/user/login`, data)
  },
  // GET /user/logout logout
  logout: () => {
    return Http.get(`/user/logout`)
  },
  // POST /user/registry 注册
  registry: data => {
    return Http.post(`/user/registry`, data)
  },
  // GET  sendValidateCoe
  sendValidateCode: phone => {
    return Http.get(`/user/sendValidateCoe?phone=${phone}`)
  },
  // GET  validate
  validate: data => {
    return Http.get(`/user/validate?phone=${data.phone}&code=${data.code}`)
  }
}
const CommentService = {
  // 添加评论 classId（课程），userId(发表评论者)，
  // content（内容）,isPub(是否公开0：公开，1：私密)
  addComment: data => {
    return Http.post(`/cooper/comment/add`, data)
  },
  // 获取某个课程的评论
  getComments: data => {
    return Http.get(`/cooper/comment/getComments`, {
      params: data
    })
  }
}
const ConstService = {
  // 获取职位
  getPosition: data => {
    return Http.get(`/cooper/const/getPosition`)
  }
}
const WXService = {
  getSignature: data => {
    return Http.post(`/cooper/wx/getSignature`, data)
  }
}
const Exam = {
  // 获取题目 GET /cooper/exam/questions 当前classId
  getExamQuestions: classId => {
    return Http.get(`/cooper/exam/questions?classId=${classId}`)
  },
  // POST /cooper/exam/isShowExam 是否显示考试按钮  参数：userId，classId
  isShowExam: data => {
    return Http.get(`/cooper/exam/isShowExam`, { params: data })
  },
  // POST /cooper/exam/commit 提交考试 参数：userId，classId，answer（按照顺序把答案汇总成string数组）
  examCommit: data => {
    return Http.post(`/cooper/exam/commit`, data)
  },
  // POST /cooper/exam/result 获取考试结果 参数：userId，classId
  examResult: data => {
    return Http.get(`/cooper/exam/result`, { params: data })
  }
}
const Opsbychen = {
  //增加角色
  addRole: data => {
    return Http.post(`/cooper/admin/addRole`, data)
  },
  //增加用户角色
  addUserToRole: data => {
    return Http.post(`/cooper/admin/addUserToRole`, data)
  },
  //增加角色课程
  addClassToRole: data => {
    return Http.post(`/cooper/admin/addClassToRole`, data)
  },
  //获取用户列表
  getAllUser: data => {
    return Http.get(`/cooper/admin/getAllUser`)
  },
  //获取角色列表
  getAllRole: data => {
    return Http.get(`/cooper/admin/getAllRole`)
  },
  //获取课程列表
  getAllClass: data => {
    return Http.get(`/cooper/admin/getAllClass`)
  }
}
const Score = {
  // GET /cooper/score/getScore
  getScore: userId => {
    return Http.get(`/cooper/score/getScore?userId=${userId}`)
  },
  getScoreLogs: userId => {
    return Http.get(`/cooper/score/getScoreLogs?userId=${userId}`)
  }
}
export {
  ClassService,
  UserService,
  CommentService,
  ConstService,
  WXService,
  Exam,
  Opsbychen,
  Score
}
