# Usar una imagen oficial de Node.js 14 como imagen base
FROM node:18.12.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto 3502
EXPOSE 3502

# Ejecutar la aplicación
CMD [ "npm", "start" ]
