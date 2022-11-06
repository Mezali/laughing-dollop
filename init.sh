#!/bin/bash
rm ./scripts/certbot.sh
printf "Insira o seu email para avisos/notificações a respeito do certbot: "
read email
echo $email
printf "Insira os nomes dos dominios a receberem certificados SSL, insira separando os nomes por virgula sem espaço; \n"
printf "EXEMPLO: www.seudominio.com,seudominio.com\n"
printf "INSIRA: "
read dominios

echo "DOMINIOS: "$dominios

printf "\x1b[31mISSO ESTÁ CORRETO? \\x1b[0m\n"

printf "SIM ou NÃO, digite: "
read resp

if [ "$resp" != "SIM" ]; then

    printf "INSIRA NOVAMENTE: "
    read dominios
    echo dominios

else

    echo "#######################"

fi

touch ./scripts/certbot.sh
echo "#!/bin/bash

certbot run -n --apache --agree-tos -d $dominios -m $email --redirect

while true; do sleep 1000; done
" >./scripts/certbot.sh

echo "#######################"
echo "Criando conteiners..."
sudo docker-compose build && sudo docker-compose up -d

echo "caso o container CertBot-PHP não inicie, use 'docker exec -ti <nome-do-container> bash' para investigar a fundo..."
sleep 5
echo "TERMINADO!"
