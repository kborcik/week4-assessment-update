const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const secretSubmit = document.querySelector('form')
const input = document.querySelector('input')

const deleteBtn = document.getElementById('delete')


const secretList = document.getElementById(`paragraphOfSecrets`)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(response => {
            const data =response.data
            alert(data)
        })
        .catch(err => console.log(err))
}

const secretPost = (event) => {
    event.preventDefault()

    let secretObj = {
        secret: input.value
    }
    
    axios.post(`http://localhost:4000/api/secrets/${input.value}`, secretObj)
        .then(response => {
            getSecrets(response.data)
            
        })
        .catch(err => console.log(err))
}

const getSecrets = () => {
    axios.get("http://localhost:4000/api/secrets/")
        .then(response => {
            createSecretList(response.data)
        })
        .catch(err => console.log(err))
}

const createSecretList = (arr) => {
    secretList.innerHTML = ""
    arr.forEach((secret,index) => {
        let item = document.createElement('p')
        
        let itemSpan = document.createElement('span')
        itemSpan.textContent = secret

        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Delete"
        deleteBtn.id = index

        let codeBtn = document.createElement('button')
        codeBtn.textContent = "Code"
        codeBtn.id = secret

        let deCodeBtn = document.createElement('button')
        deCodeBtn.textContent = "Decode"
        deCodeBtn.id = secret


        item.appendChild(itemSpan)
        item.appendChild(deleteBtn)
        item.appendChild(codeBtn)
        item.appendChild(deCodeBtn)
        secretList.appendChild(item)


       

        deleteBtn.addEventListener('click', deleteSecret)
        codeBtn.addEventListener('click', codeSecret)
        deCodeBtn.addEventListener('click', deCodeSecret )



})
}

const deleteSecret = evt => {
    axios.delete(`http://localhost:4000/api/secrets/${evt.target.id}`)
        .then(response => {
            createSecretList(response.data)
        })
        .catch(err => console.log(err))
}

const codeSecret = evt => {
    let codeObj = {
        secret: myCipherCoded(evt.target.id)
    }
    axios.put(`http://localhost:4000/api/secrets/${evt.target.id}`, codeObj)
    .then(response => {
        createSecretList(response.data)

    }).catch(err => console.log(err))
}

const deCodeSecret = evt => {
    let codeObj = {
        secret:  myCipherDecoded(evt.target.id)
    }

    axios.put(`http://localhost:4000/api/secrets/${evt.target.id}`, codeObj)
    .then(response => {
        createSecretList(response.data)

    }).catch(err => console.log(err))

}

const myCipher ={
    a:'m',
    b:'x',
    c:'o',
    d:'b',
    e:'y',
    f:'s',
    g:'c',
    h:'z',
    i:'j',
    j:'k',
    k:'g',
    l:'a',
    m:'w',
    n:'d',
    o:'u',
    p:'e',
    q:'h',
    r:'v',
    s:'t',
    t:'l',
    u:'f',
    v:'n',
    w:'q',
    x:'i',
    y:'p',
    z:'r'
}

function cipherChar(char) {
    const cipher = myCipher[char]
    if (cipher) {
      return cipher
    } else {
      return char
    }
  }

function getKeyByValue(object, value) {
    for (let key in object) {
      if (object[key] === value) {
        return key;
      }
    }
    return null;
  }

function unCipherChar(char) {

    const uncipher = getKeyByValue(myCipher, char)
    if (uncipher) {
        return uncipher
    } else {
        return char
    }
}


const myCipherCoded = (string) =>{
    let result = ''
    for(let i = 0; i < string.length; i ++){
        const char = string[i]
        result += cipherChar(char)
    }

    return result

}


const myCipherDecoded = (string) =>{
    let result = ''
    for(let i = 0; i < string.length; i ++){
        const char = string[i]
        result += unCipherChar(char)
    }
    return result
}



secretSubmit.addEventListener('submit', secretPost)
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)


getSecrets()