class User {
	//quando o bd ver quem esta logado, a routa instacializar a classe com sua role encontrada
  constructor(role) {
		/*
		Index ---- Permissão
		0 			- 		post
		1 			-			edit
		2 			-			delete
		3 			-			download
		4 			-			upload
		*/
		this.PERMISISION = null
		this.role = role
 }
 
 setPermission() {
	 switch(this.role) {
		 case "GM":
		 case "MOD":
		 case "Remixante":
			 this.PERMISISION = [1,1,1,1,1]
			 break
		 default:
			 this.PERMISISION = [0,0,0,0,0]
	 }
 }
}

module.exports = User