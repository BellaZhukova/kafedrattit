function AddFile(){
    document.getElementById("jsonFileInput").addEventListener("change", function() { //загрузка файла
        let file_to_read = document.getElementById("jsonFileInput").files[0];
        let fileRead = new FileReader();
        fileRead.readAsText(file_to_read);
        fileRead.onload = function(e) {
            let content = e.target.result;
            let parse = JSON.parse(content);
            console.log(parse);


                let form = document.createElement('form') //создание формы
                form.setAttribute('action', '#')
                form.setAttribute('class', 'form')
                document.body.appendChild(form)

                let labelInput =  document.createElement('div') //создание контейнера для label и input
                labelInput.setAttribute('id', 'labelInp')
                form.appendChild(labelInput)

                for (let field in parse.fields){ //создание label
                    let label = document.createElement('label')
                    label.setAttribute('id', 'label')
                    label.setAttribute('class', 'labelClass')
                    // label.setAttribute('for', 'inputs')
                    label.innerHTML = parse.fields[field].label
                    labelInput.appendChild(label)

                    let readInput = document.createElement('input') //создание input
                    readInput.setAttribute('id', 'inputs')
                    readInput.setAttribute('class', 'input')
                    readInput.innerHTML = parse.fields[field].input
                    labelInput.appendChild(readInput)

                    if (parse.fields[field].label == null){ //вообще
                        label.setAttribute('hidden', 'true')
                    } //Почему не работает плак плак
                    if (parse.fields[field].input.placeholder){
                        readInput.setAttribute('placeholder', parse.fields[field].input.placeholder)
                    } //далее у нас идет перебор атрибутов к тегам (выпадающие списки ещё в разработке)
                    if(parse.fields[field].input.type){
                        readInput.setAttribute('type', parse.fields[field].input.type)
                    }
                    if (parse.fields[field].input.required){
                        readInput.setAttribute('required', parse.fields[field].input.required)
                    }
                    if (parse.fields[field].input.mask){
                        readInput.setAttribute('mask', parse.fields[field].input.mask)
                    }
                    if (parse.fields[field].input.colors){
                        readInput.setAttribute('colors', parse.fields[field].input.colors)
                    }
                    if (parse.fields[field].input.checked){
                        readInput.setAttribute('checked', parse.fields[field].input.checked)
                    }
                    if (parse.fields[field].input.filetype){
                        readInput.setAttribute('filetype', parse.fields[field].input.filetype)
                    }
                    if (parse.fields[field].input.multiple){
                        readInput.setAttribute('multiple', parse.fields[field].input.multiple)
                    }
                    // здесь я как раз пыталась сделать выпадающий список, по итогу получилось не очень(не получилось)

                    // if (parse.fields[field].input.type === 'technology'){
                    //     readInput.setAttribute('hidden', 'true')
                    //     let select = document.createElement('select')
                    //     readInput.appendChild(select)
                    // }

                    //здесь я пыталась references, но снова же получилось не очень

                    // for(let link in parse.references){
                    //     let input = document.createElement('input')
                    //     input.innerHTML = parse.references[link]
                    //     document.body.appendChild(input)
                    //
                    //     if (parse.references[link].type){
                    //         input.setAttribute('type', parse.references[link].type)
                    //     }
                    //     if (parse.references[link].required){
                    //         readInput.setAttribute('required', parse.references[link].required)
                    //     }
                    //     if (parse.references[link].checked){
                    //         readInput.setAttribute('checked', parse.references[link].checked)
                    //     }
                    //
                    // }

                    //а button ещё не готов
                }
            }
        }
        
    )
}
AddFile() //Неудачная попытка создать форму
let button = document.createElement('button')
button.setAttribute('id', 'reset')
button.reset(AddFile)
document.body.appendChild(button)

