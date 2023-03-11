module.exports = (sequelize,DataTypes) => {
    let alias = 'Categoria';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        categoria: DataTypes.STRING
        
    }
    
    let config ={
        tableName:"categorias_deportista",
        timestamps:false,
    }
    
    const Categoria = sequelize.define(alias, cols,config);
    
    Categoria.associate = function (models){

        Categoria.hasMany (models.Deportista, {
            as: "deportista",
            foreignKey: "categoria_id"
        })
    }

    return Categoria;
}