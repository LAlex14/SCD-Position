module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            latitude:  String,
            longitude: String,
            date: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("position", schema);
};