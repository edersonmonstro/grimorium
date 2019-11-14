# GRIMORIUM

* criar pacotador vazio
```
npm init -y
```

* adicionando express - gerencia rotas e requests http 
```
npm add express
```

* adicionando body-parser - node entender requests recebendo json e parametros via url
```
npm add body-parser
```

* adicionando mongoose - facilitador do mongdb
```
npm add body-parser
```

* adicionando bcrypt.js - encriptador/decriptador
```
npm add bcrypt.js
```
* adicionando json web token - tokenizador de sessão - pacote oficial do node para jwt
```
npm add jsonwebtoken
```

# REST Requests
* GET root
```
{{ base_url  }}
```

* POST Registrar
```
{{ base_url  }}/aut/registrar

{
	"nome" : "Ederson",
	"senha" : "12345",
	"email" : "edersonmedeiros@gmail.com"
}
```

* POST Autenticar
```
{{ base_url  }}/aut/autenticar

{
	"email" : "edersonmedeiros@gmail.com",
	"senha" : "12345"
}
```

* GET Projeto (teste de token)
```
{{ base_url  }}/projeto

HEADER Authorization
VALUE  Bearer asdasdasdasdasd
```

