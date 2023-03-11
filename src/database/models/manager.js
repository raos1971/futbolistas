module.exports = (sequelize,dataTypes) => {
    let alias = 'Manager';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },
        nombre: {
            type:dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        pais: {
              type: dataTypes.INTEGER
        },
        ciudad:{
            type: dataTypes.INTEGER
            },
        
        avatar:{
            type: dataTypes.STRING
        },
        password: {
           type: dataTypes.STRING
        },
       
    }
    
    let config ={
        tableName:"managers",
        timestamps:false,
        
    }
    
    const Manager = sequelize.define(alias, cols,config);
    return Manager;
    
    }