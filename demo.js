const fileinput = document.getElementById("fileInput")


fileinput.addEventListener("change",function(event){
    const xlfile = event.target.files[0]
    console.log(xlfile)

    const reader = new FileReader()
    reader.onload = function(event){
        const data = event.target.result 
        const workbook = XLSX.read(data, {type:"binary"});

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header:"A"})

        console.log(emailList)
    }

    reader.readAsBinaryString(xlfile)
    
})