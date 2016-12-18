/**
 * 把含有rowspan、colspan的table还原
 */
jQuery.fn.RevertTable = function(){
    $("tr",this).each(function(trindex,tritem){
        revertTr('th', trindex, tritem);
        revertTr('td', trindex, tritem);
    });
};

function revertTr(strTag, trindex, tritem) {
    $(tritem).find(strTag).each(function(tdindex,tditem){
        var rowspanCount = $(tditem).attr("rowspan");
        var colspanCount = $(tditem).attr("colspan");
        var value = $(tditem).text();
        var newtd = '<' + strTag + '>' + value + '</' + strTag + '>';
        if(rowspanCount>1){
            var parent=$(tditem).parent("tr")[0];
            while(rowspanCount-->1){
                $($(parent).next()[0].children[tdindex]).before(newtd);
                parent=$(parent).next();
            }
            $(tditem).attr("rowspan",1);
        }
        if(colspanCount>1){
            while(colspanCount-->1){
                $(tditem).after(newtd);
            }
            $(tditem).attr("colspan",1);
        }
    });
}

/**
 * 添加一行数据
 * @param aryData
 * @param strTag
 * @param itemTr
 */
function addData(aryData, strTag, itemTr) {
    var trdata = [];

    $(tritem).find(strTag).each(function(tdindex,tditem){

    });
}

/**
 * 导出表格内容
 * @param tablename
 * @param usertype
 * @param pagename
 */
function data_export(tablename, usertype, pagename) {

    var dataTable = $('#' + tablename);
    var strHtmlOld = dataTable.prop('outerHTML');

    // 先还原表格
    dataTable.RevertTable();

    var sendData = [];

    //
    // $('tr', tablename).each(function(trindex, tritem) {
    // });


    var i = 0;

    //send order data
    $('#' + tablename + ' thead tr').each(function () {
        var tr = $(this);
        var trdata = [];

        var j = 0;
        $(tr).find('th').each(function () {
            var td = $(this);
            $(td).find('span').remove();
            $(td).find('button').remove();
            $(td).find('a').remove();

            var td_data = td.html().toString().trim();
            trdata[j] = td_data;
            j++;
        });
        sendData[i] = trdata;
        i++;
    });

    $('#' + tablename + ' tbody tr').each(function () {
        var tr = $(this);
        var trdata = [];

        var j = 0;
        $(tr).find('td').each(function () {
            var td = $(this);
            $(td).find('span').remove();
            $(td).find('button').remove();
            $(td).find('a').remove();

            var td_data = td.html().toString().trim();
            trdata[j] = td_data;
            j++;
        });
        sendData[i] = trdata;
        i++;
    });

    // 还原原来的表格内容
    dataTable.prop('outerHTML', strHtmlOld);

    //
    // 添加系统日志
    //
    var send_data = {
        'data': sendData,
        'usertype': usertype,
        'page': pagename
    };

    $.ajax({
        type: 'POST',
        url: API_URL + "export",
        data: send_data,
        success: function (data) {
            console.log(data);
            if (data.status == 'success') {
                var path = data.path;
                location.href = path;
            }
        },
        error: function (data) {
            //console.log(data);
        }
    });
}

/**
 * 打印
 * @param strId
 */
function printContent(strId, usertype, pagename) {

    // 打印
    $('#' + strId).print();

    // 没有用户类型，退出
    if (usertype <= 0) {
        return;
    }

    //
    // 添加系统日志
    //
    var send_data = {
        'usertype': usertype,
        'page': pagename
    };

    $.ajax({
        type: 'POST',
        url: API_URL + "printlog",
        data: send_data,
        success: function (data) {
        },
        error: function (data) {
        }
    });
}