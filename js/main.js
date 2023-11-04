function AddFile(){ //Функция добавления файла
    document.getElementById("jsonFileInput").addEventListener("change", function() { //загрузка файла
        let file_to_read = document.getElementById("jsonFileInput").files[0];
        let fileRead = new FileReader();
        fileRead.readAsText(file_to_read);
        fileRead.onload = function(e) {
            let content = e.target.result;
            let parse = JSON.parse(content);
            console.log(parse);
            form(parse)

                }
            }
        )
    }

function form (parse){ //Функция создания форма
    let form = document.createElement('form') //создание формы
    form.setAttribute('action', '#')
    form.setAttribute('class','form')
    form.setAttribute('id', 'id__form')
    document.body.appendChild(form)

    function name(){ //Функция передачи свойства Имени из json
        let name = document.createElement('p')
        name.setAttribute('class', 'name')
        name.innerHTML = parse.name
        form.appendChild(name)
    }

    function fields(){ //Функция создания и заполнения label и input

        let div = document.createElement('div')
        div.setAttribute('class', 'form__inputs')
        form.appendChild(div)

        for (let field in parse.fields){ //создание label
            if(parse.fields[field].label){
                let label = document.createElement('label')
                label.setAttribute('id', 'label')
                label.setAttribute('class', 'labelClass')
                label.innerHTML = parse.fields[field].label
                div.appendChild(label)
            }


            if(parse.fields[field].input.multiple){
                let select = document.createElement('select')
                select.setAttribute('class', 'select')
                div.appendChild(select)

                for (let element in parse.fields[field].input.technologies){
                    let option = document.createElement('option')
                    option.innerHTML = parse.fields[field].input.technologies[element]
                    select.appendChild(option)
                }
                for (let element in parse.fields[field].input.filetype){
                    let option = document.createElement('option')
                    option.innerHTML = parse.fields[field].input.filetype[element]
                    select.appendChild(option)
                }
                if (parse.fields[field].input.technologies){
                    select.setAttribute('multiple', parse.fields[field].input.technologies)
                }
                if (parse.fields[field].input.filetype){
                    select.setAttribute('filetype', parse.fields[field].input.filetype)
                }
            }
            else if (parse.fields[field].input.type === 'textarea'){
                let textarea = document.createElement('textarea')
                textarea.setAttribute('class', 'textarea')
                textarea.innerHTML = parse.fields[field].input.type
                div.appendChild(textarea)


                let replace = document.querySelector('textarea')
                let textValue = replace.value
                let text = textValue.replace('textarea', '')
                replace.value = text

                if (parse.fields[field].input.type){
                    textarea.setAttribute('textarea', parse.fields[field].input.type)
                }
            }

            else{
                let readInput = document.createElement('input') //создание input
                readInput.setAttribute('id', 'inputs')
                readInput.setAttribute('class', 'input')
                readInput.innerHTML = parse.fields[field].input
                div.appendChild(readInput)


                if (parse.fields[field].input.placeholder){ //Проверка на атрибуты
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
                    readInput.setAttribute('placeholder', parse.fields[field].input.mask)
                }
                if (parse.fields[field].input.colors){
                    readInput.setAttribute('colors', parse.fields[field].input.colors)
                }
                if (parse.fields[field].input.checked){
                    readInput.setAttribute('checked', parse.fields[field].input.checked)
                }
            }
        }
    }
    function references(){ //Функция согласия на Принятия условий сайта

        let divRef = document.createElement('div')
        divRef.setAttribute('id', 'divRef')
        divRef.setAttribute('class', 'references__div')
        form.appendChild(divRef)

        for(let link in parse.references){
            if(parse.references[link].input){
                let input = document.createElement('input')
                input.innerHTML = parse.references[link].input
                divRef.appendChild(input)

                if (parse.references[link].input.type){
                    input.setAttribute('type', parse.references[link].input.type)
                }
            }
            if(parse.references[link]["text without ref"]){
                let text_without_ref = document.createElement('p')
                text_without_ref.textContent = parse.references[link]["text without ref"]
                divRef.appendChild(text_without_ref)
            }
            if(parse.references[link].text){
                let text = document.createElement('p')
                text.textContent = parse.references[link].text
                divRef.appendChild(text)
            }
            if(parse.references[link]["ref"]){
                let ref = document.createElement('a')
                ref.setAttribute('class', 'link__references')
                ref.setAttribute('href', '#')
                ref.textContent = parse.references[link]["ref"]
                divRef.appendChild(ref)
            }
        }
    }

    function button(){ //Добавление кнопок из формы
        let button__div = document.createElement('div')
        button__div.setAttribute('class', 'button__div')
        form.appendChild(button__div)
        for(let button in parse.buttons){
            let buttons = document.createElement('button')
            buttons.innerHTML = parse.buttons[button].text
            button__div.appendChild(buttons)
        }
    }
    function clearButton() { //Добавление кнопки полного удаления формы
        let clearButton = document.createElement('button');
        clearButton.setAttribute('id', 'clear');
        clearButton.innerHTML = "Reset";
        form.appendChild(clearButton);

        clearButton.addEventListener('click', function() {
            document.getElementById("jsonFileInput").value = ""
            document.getElementById('id__form').reset()
            document.getElementById('id__form').remove()
        });
    }

    name(parse)
    fields(parse)
    references(parse)
    button(parse)
    clearButton(parse)
}



AddFile()

