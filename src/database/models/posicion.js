module.exports = (sequelize,DataTypes) => {
    let alias = 'Posicion';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        posicion: DataTypes.STRING
        
    }
    
    let config ={
        tableName:"posiciones_deportista",
        timestamps:false,
    }
    
    const Posicion = sequelize.define(alias, cols,config);
    
    Posicion.associate = function (models){

        Posicion.hasMany (models.Deportista, {
            as: "deportista",
            foreignKey: "posicion_id"
        })
    }

    return Posicion;
}