export default function validateTest(testInfo){
    let errors = {}
    
    if(!testInfo.date){
        errors.date ="日期不能为空！"
    }
    if(!testInfo.time){
        errors.time ="时间不能为空！"
    }
    if(!testInfo.doctorName){
        errors.doctorName ="医生名不能为空！"
    }
    if(!testInfo.testname){
        errors.testname="检查名不能为空！"
    }
    if(!testInfo.testtype){
        errors.testtype="检查类型不能为空！"
    }
    if(!testInfo.address){
        errors.address="检查地址不能为空！"
    }
    if(!testInfo.result){
        errors.result ="药信息不能为空！"
    }
    if(!testInfo.creator){
        errors.creator ="创建者不能为空！"
    }
    return errors;
}