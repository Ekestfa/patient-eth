export default function validateTest(testInfo){
    let errors = {}
    
    if(!testInfo.date){
        errors.date = "日期不能为空！"
    }
    if(!testInfo.time){
        errors.time = "时间不能为空！"
    }
    if(!testInfo.doctorName){
        errors.doctorName = "医生名不能为空！"
    }
    if(testInfo.doctorName.length > 30){
        errors.doctorName = "医生名太长了！"
    }
    if(!testInfo.testname){
        errors.testname = "检查名不能为空！"
    }
    if(testInfo.testname.length > 50){
        errors.testname = "检查名太长了！"
    }
    if(!testInfo.testtype){
        errors.testtype = "检查类型不能为空！"
    }
    if(testInfo.testtype.length > 50){
        errors.testtype = "检查类型太长了！"
    }
    if(!testInfo.address){
        errors.address = "检查地址不能为空！"
    }
    if(testInfo.address.length > 250){
        errors.address = "检查地址太长了"
    }
    if(!testInfo.result){
        errors.result = "结果信息不能为空！"
    }
    if(testInfo.result.length > 350){
        errors.result = "结果信息太长了！"
    }
    if(!testInfo.creator){
        errors.creator = "创建者不能为空！"
    }
    if(testInfo.creator.length > 30){
        errors.creator = "创建者名太长了！"
    }
    return errors;
    }