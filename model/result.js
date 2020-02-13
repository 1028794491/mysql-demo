exports.createResult = function (success, data, limits) {
    var result = {};
    result.success = success;
    result.data = data;
    if(limits)
    result.limits = limits[0]["count(list_id)"]
    return result;
};
