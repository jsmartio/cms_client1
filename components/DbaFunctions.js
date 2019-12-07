import $ from 'jquery'

export const rmDupes = (DBname) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname
        }
        $.ajax({
        
            url: '/dba/removedupes2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

// restore from another designated DB
export const restoreFromNew = (DBname) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname
        }
        $.ajax({
        
            url: '/dba/restorfromnew2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

// restore from SQL file
export const restoreMainDB = (DBname) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/dba/restormain',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

export const fromMainDbToNew = (DBname) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname
        }
        $.ajax({
        
            url: '/dba/copyfromdb2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

export const removeDB = (DBname) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "DBname": DBname
        }
        $.ajax({
        
            url: '/dba/removedb2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}

export const createDB = (newDbName) => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "newDbName": newDbName
        }
        $.ajax({
        
            url: '/dba/createdb2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}
  
export const getDBs = () => {
    return new Promise((resolve, reject) => {
        var args1 = {
            "na": "na"
        }
        $.ajax({
            url: '/dba/showdbs2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : args1,
            error: function(err) {
                reject(err)
            },
            success: function(data) {
                resolve(data)
            }
        })
    })
}
  
