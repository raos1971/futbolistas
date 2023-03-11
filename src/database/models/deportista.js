module.exports = (sequelize,dataTypes) => {
    let alias = 'Deportista';
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
        telefono: {
              type: dataTypes.INTEGER
        },
        estatura:{
            type: dataTypes.INTEGER
            },
       peso:{
                type: dataTypes.INTEGER
                },
       indice_masa_corporal:{
                    type: dataTypes.INTEGER
                    },

        salto_vertical:{
                        type: dataTypes.INTEGER
                            },

        salto_horizontal:{
                        type: dataTypes.INTEGER
                        },
    
        envergadura:{
                    type: dataTypes.INTEGER
                                },

        velocidad:{
                    type: dataTypes.INTEGER
                                    },
        fecha_nacimiento: {
           type: dataTypes.INTEGER
        },
        edad:{
            type: dataTypes.INTEGER
        },
        perfil: {
            type: dataTypes.STRING
        },
        video_url:{
            type: dataTypes.STRING
        },
        avatar: {
           type: dataTypes.STRING
        },
        posicion_id: {
           type: dataTypes.INTEGER
        },
        categoria_id: {
           type: dataTypes.INTEGER
        },
    }
    
    let config ={
        tableName:"deportistas",
        timestamps:false,
        
    }
    
    const Deportista = sequelize.define(alias, cols,config);
    
    Deportista.associate = function (models){

        Deportista.belongsTo (models.Posicion, {
            as: "posicion",//asi se llaman las asociaciones cuando las necessitas
            foreignKey: "posicion_id"
        })

        Deportista.belongsTo (models.Categoria, {
            as: "categoria",
            foreignKey: "categoria_id"
        })
    }

    return Deportista;
}