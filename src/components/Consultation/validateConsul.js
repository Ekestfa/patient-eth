export default function validateConsul(consultationInfo){
    let errors = {}
    
    if(!consultationInfo.date){
        errors.date ="日期不能为空！"
    }
    if(!consultationInfo.time){
        errors.time ="时间不能为空！"
    }
    if(!consultationInfo.doctorName){
        errors.doctorName ="医生名不能为空！"
    }
    if(!consultationInfo.addr){
        errors.addr="看病地址不能为空！"
    }
    if(!consultationInfo.disease){
        errors.disease="疾病类型不能为空！"
    }
    if(!consultationInfo.description){
        errors.description="疾病描述不能为空！"
    }
    if(!consultationInfo.medicine){
        errors.medicine ="药信息不能为空！"
    }
    if(!consultationInfo.creator){
        errors.creator ="创建者不能为空！"
    }
    return errors;
}