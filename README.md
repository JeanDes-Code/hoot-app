# hoot-app is a social network for small comunities like companies, clubs,... 
# It was firstly made to be used by nerds who roleplay online in groups (Foundry VTT, Roll20, ...)

## This is a **personal project, and a work in progress**. 
It mainly uses the MERN stack + Redux + Socket.io.
Today, the app is useable but contains bugs (mainly related to Socket.io configuration).

### Firstly, you need to manage your **Database access.**

1. Download this Project [here](https://github.com/JeanDes-Code/hoot-app/archive/refs/heads/master.zip)
2. You'll need a free MongoDB database :
   -> you can create one [here](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=bing&utm_campaign=mdb_bs_emea_france_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=415204542&adgroup=1220458376948492&msclkid=8648896224ed14f62bc2ebee81ecd99a)
3. Open the main folder in your IDE.

You'll find a file called **.env.exemple** into "../serv-hoot/config" where you'll need to :
    1. set up your PORT (default is 5000) CLIENT_URL (i use localhost:3000) and TOKEN (a long string of random characters) [<- it'll be used to securize data]
    2. set up your Database : HOST (it's the adress of your DB, should look like >@example.smthg.mongodb.net/smthghere)
                              USER (an account username with access to your database, for security purpose avoid using the ADMIN one ! 
                              It should have read/write access to the database you use)
                              PASS (the password of this account)
    3. now save this file and change it's name to ".env" (get rid of the '.exemple')
                              
                              
### Secondly, Install every dependencies

    1. In terminal at "hoot-app/serv-hoot/ " type           `npm install`
    2. In another terminal at "../serv-hoot/socket/" type   `npm install`
    3. In another terminal at "../serv-hoot/client" type    `npm install`
    
    
### Then to start using it : 

    1. In terminal at "hoot-app/serv-hoot/ " type           `npm start`
    2. In another terminal at "../serv-hoot/socket/" type   `npm start`
    3. In another terminal at "../serv-hoot/client" type    `npm start`
    4. The web app should launch, Create an account and enjoy !


Don't forget to send me Feedback or Ideas or if you want to help me to build this app using the app or using my GitHub account
