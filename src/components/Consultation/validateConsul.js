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
    if(consultationInfo.doctorName.length > 30){
        errors.doctorName = "医生名太长了！"
    }
    if(!consultationInfo.addr){
        errors.addr = "看病地址不能为空！"
    }
    if(consultationInfo.addr.length > 250){
        errors.addr = "地址太长了！"
    }
    if(!consultationInfo.disease){
        errors.disease="疾病类型不能为空！"
    }
    if(consultationInfo.disease > 50){
        errors.disease = "疾病名太长了！"
    }
    if(!consultationInfo.description){
        errors.description="疾病描述不能为空！"
    }
    if(consultationInfo.description.length > 350){
        errors.description = "疾病描述太长了！"
    }
    if(!consultationInfo.medicine){
        errors.medicine ="药信息不能为空！"
    }
    if(consultationInfo.medicine.length > 350){
        errors.medicine = "药信息太长了！"
    }
    if(!consultationInfo.creator){
        errors.creator ="创建者不能为空！"
    }
    if(consultationInfo.creator.length > 30){
        errors.creator = "创建者信息太长了！"
    }
    return errors;
}