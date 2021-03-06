var fromDtStr = '';
var toDtStr = '';
//var $deleter = '<input type="button" value="刪除" onclick="javascript:deleteTR(this)"/>&nbsp;';
//var $deleter = '<img alt="delete" src="'+ contextPath +'/Images/button_cancel.png" height="10" width="10" onclick="javascript:deleteTR(this)"/>&nbsp;';
$(function() {
    //------- prototype start ---------      
    getGTL2TourAreaCD(); //旅遊地點下拉選單內容
    getGTL2TourAreaCDS(); //旅遊地點下拉選單內容_簡單輸入
    getGTL2ProjNM();     //旅遊方案下拉選單內容(目前Hard Code,將來用Ajax處理)
    getGTL2optionS();
    //------- prototype end ---------


    //------- initialize ------------
    $('#actn_KYC').attr('disabled', true);
    $('#actn_SumitIns').attr('disabled', true);
    $('#suitMKYS').attr('checked',true); 
    $('#content').tabs();
    $('#rateTypeTRS').hide();
    initIntervalDatePicker('from', 'to');
    $('#to').datepicker( "option", "defaultDate", '+1y' );
    $('#to').attr('disabled', true);
    $('#tm').attr('disabled', true);
    $('#tm1').attr('disabled', true);
    initAct($('#actionCD').val());
    $('#queryDataId').val('');
    $('#queryDataIdStr').text($('#dataID').val()+'-'+($('#dataIDVerNo').val()<10?'0':'')+$('#dataIDVerNo').val());



    $( "#custBth, #i_custBth" ).datepicker({
        defaultDate: '-30y',
        maxDate: 0,
        minDate: '-80y',
        yearRange: 'c-50:c+30',
        dateFormat: "yy/mm/dd",
        changeYear: true,
        changeMonth: true,
        showMonthAfterYear: true 
    });
    //------- click event ----------
    

    
    
    $('#actn_KYC').click(function(){
         $('#keyin-form_tmpS').dialog('open');
    });
    
    $("#keyin-form_tmpS").dialog({
        autoOpen: false,
        resizable: false,
        height: 900,
        width: 800,
        modal: true,
        buttons: [
        {
            text: uConfirm,
            click: function() {
                var planCnt=0;
                var amtFlag='Y';
                var projFlag='N';
                var projKey='';
                
                //alert($('input:radio:checked[name="CustData"]').val());
               $('#actn_SumitIns').attr('disabled', false);
                
                
                //getGPAInputTR('N'+projKey);
                $(this).dialog("close");                    
                
            }
        },
        {
            text: uCancel,
            click: function() {
                $(this).dialog("close");
            }
        }
        ],
        open: function() {
//            if(tmpKeyinClassType!=tmpClassType){
//                getGPAKeyinProjList();
//                tmpKeyinClassType=tmpClassType;
//            }
            $('#keyinTbody tr').each(function(){
                $(this).find('[id=checkItem]').removeAttr("checked").removeAttr("disabled");
                $(this).find('[id=amtCD]').val('').removeAttr("disabled");
            });
            //dispPlanItem('M');
        },
        close: function() {
            dispPlanItem('M');
        }
    });    
    
 
    $('#searchCutBtn2S').click(function(){  
        
        $('#keyin-form2S').dialog('open');
        
    }); 
 
    $('#searchCutBtnS').click(function(){    
        $('#keyin-formS').dialog('open');
    });

    $("#keyin-formS").dialog({
        autoOpen: false,
        resizable: false,
        height: 700,
        width: 750,
        modal: true,
        buttons: [
        {
            text: uConfirm,
            click: function() {
                var planCnt=0;
                var amtFlag='Y';
                var projFlag='N';
                var projKey='';
                
                //alert($('input:radio:checked[name="CustData"]').val());
                $('input:radio:checked[name="CustData"]:parant').css("background", "yellow");
                $('#keyinTbody tr').each(function(){
                    if($(this).find('[id=checkItem]').is(':checked')){
                        if($(this).find('[id=amtCD]').val()==''){
                            amtFlag='N';
                        }
                        planCnt=planCnt+1
                        projKey=projKey+$(this).data('planCD')+$.trim($(this).find('[id=amtCD]').val())+'$';
                    }
                });
                $('#projTbody tr[level="1"]').each(function(){
                    if($(this).data("projKey") == projKey
                        && $(this).data("classType") == tmpClassType
                        && $(this).data("underAge15") == ($('#checkUnderAge15').is(':checked')?'Y':'N')){
                        projFlag='Y';
                    }
                });
    
                    //getGPAInputTR('N'+projKey);
                    //$(this).dialog("close");                    
                
            }
        },
        {
            text: uCancel,
            click: function() {
                $(this).dialog("close");
            }
        }
        ],
        open: function() {
//            if(tmpKeyinClassType!=tmpClassType){
//                getGPAKeyinProjList();
//                tmpKeyinClassType=tmpClassType;
//            }
            $('#keyinTbody tr').each(function(){
                $(this).find('[id=checkItem]').removeAttr("checked").removeAttr("disabled");
                $(this).find('[id=amtCD]').val('').removeAttr("disabled");
            });
            //dispPlanItem('M');
        },
        close: function() {
            dispPlanItem('M');
        }
    });


    $('#addressBtn').click(function(){
        zipcodeId = 'invZipCD';
        addressId = 'invAdrs';
        $('#address-form').dialog('open');
    });

    $('#rcptAddressBtn').click(function(){
        zipcodeId = 'rcptZipCD';
        addressId = 'rcptAdrs';
        $('#address-form').dialog('open');
    });
    
    function tourAreacheck(){
        if($('.tourArea_S:checked').val()=='Y'){        
            $('#foreign_set_S').show();
        }else{
            $('#foreign_set_S').hide();
        }        
    }
    
    $('#tourAreaN_S').click(function(){
        tourAreacheck();
    });

    $('#tourAreaY_S').click(function(){
        tourAreacheck();
    });
    
    
    $('#suitMKNS').click(function(){//自行輸入
        tourAreacheck();
        $('#rateTypeTRS').show();
        $('#Proj').hide();
        $('#projNmTxt').hide();
        $('#projCD').hide();
        if(!$('#projTbody').is(':empty') && tmpSuitMK == 'Y'){
            $('#delete-confirm').dialog('open');
        }
    });

    $('#suitMKYS').click(function(){
        
        $('#rateTypeTRS').hide();
        $('#Proj').show();
        $('#projNmTxt').show();
        $('#projCD').show();
        if(!$('#projTbody').is(':empty') && tmpSuitMK == 'N'){
            $('#delete-confirm').dialog('open');
        }
    });    

    $('#actn_inquery').click(function(){
        disabledBtn();
        $("#invForm").after($("<form id='queryForm' name='queryForm' action='quot' />")
                       .append("<input type='hidden' name='queryTyp' id='queryTyp' value='Q'/>")
                       .append("<input type='hidden' name='queryDataId' id='queryDataId' />")
                       .append("<input type='hidden' name='actionCD' id='actionCD' value=''/>"));
        $("#queryDataId").val($('#dataID').val()+'-'+($('#dataIDVerNo').val()<10?'0':'')+$('#dataIDVerNo').val());
        $("#queryForm").submit();
    });

    $('#actn_result').click(function(){
        disabledBtn();
        $("#invForm").after($("<form id='queryForm' name='queryForm' action='quot_chgPrm' />")
                       .append("<input type='hidden' name='inqDataId' id='inqDataId' />"));
        $("#inqDataId").val($('#dataID').val()+'-'+($('#dataIDVerNo').val()<10?'0':'')+$('#dataIDVerNo').val());
        $("#queryForm").submit();
    });

    $('#actn_saveData').click(function(){
        disabledBtn();
        composeProjDataJSON();
        $("#inputDataId").val($('#dataID').val()+'-'+($('#dataIDVerNo').val()<10?'0':'')+$('#dataIDVerNo').val());
        $('#to').removeAttr('disabled');
        $('#tm').removeAttr('disabled');
        $('#tm1').removeAttr('disabled');
        $("#invForm").submit();
    });

    $('#actn_invConfirm').click(function(){
        validateSubmit();
    });

    $('#actn_prtInv').click(function(){
        disabledBtn();
        var url =  contextPath + '/action/prdt/GPA/invite_showPDF';
        $.fileDownload(url, {httpMethod: 'POST', data: {'appGPAM.dataID'      : $('#dataID').val(),
                                                        'appGPAM.dataIDVerNo' : $('#dataIDVerNo').val(),
                                                        'pdfTitle'            : '1',
                                                        'actionCD'            : 'PRI',
                                                        'formTyp'             : 'GPA02'}});
        enabledBtn();
    });

    //------- change event ----------
    $('#from').change(function(){
        //$('#yearDiff').val(1);$('#monthDiff').val(1);$('#dayDiff').val(1);
        var dayDiff = eval($('#dayDiff').val());
        if($('#from').val().split('/')[2] != null){
            var yNum = eval($('#from').val().split('/')[0]) + eval($('#yearDiff').val());
            var mNum = eval('1'+$('#from').val().split('/')[1])-100 + eval($('#monthDiff').val());
            var dNum = eval('1'+$('#from').val().split('/')[2])-100;
            if(mNum>12){
                mNum = mNum - 12;
                yNum = yNum + 1;
            }
            var tmpDate=$.datepicker.parseDate("yy/mm/dd", yNum + '/1/1');
            tmpDate.setMonth(mNum,0);
            if(isEndDt(fromDtStr) && isEndDt(toDtStr) && isEndDt($('#from').val())){//處理月底日期
                dNum = tmpDate.getDate();
                dayDiff = 0;
            }else if(isEndDt(fromDtStr) && isEndDt(toDtStr)){
                dayDiff = 0;
            }else if(dNum > tmpDate.getDate()){ //處理其他日期
                var tmpDays= dNum - tmpDate.getDate();
                dNum = tmpDate.getDate();
                if(dayDiff < tmpDays * (-1) ){
                    dayDiff = dayDiff + tmpDays;
                }else if(eval($('#dayDiff').val()) < 0){
                    dayDiff = 0;
                }
            }
            $('#to').val(yNum + '/' + mNum + '/' + dNum);
            var toDate=$.datepicker.parseDate("yy/mm/dd", $('#to').val());
            toDate.setDate(toDate.getDate() + dayDiff);
            $('#to').val($.datepicker.formatDate("yy/mm/dd", toDate));
        }
    });

    $('#polCopyNum').change(function(){
        $('#polCopyNum').val(numLmt($('#polCopyNum').val()));
    });

    $('#rcptCopyNum').change(function(){
        $('#rcptCopyNum').val(numLmt($('#rcptCopyNum').val()));
    });

    fromDtStr = $('#from').val();
    toDtStr = $('#to').val();
    
});

function validateSubmit() {
    cleanTips();
    var valid = true;
    var $invNmB = $("#invNmB"),
    $invTelOAreaCD = $("#invTelOAreaCD"),
    $invTelONo = $("#invTelONo"),
    $invTelOExt = $("#invTelOExt"),
    $invFaxAreaCD = $("#invFaxAreaCD"),
    $invFaxNo = $("#invFaxNo"),
    $invZipCD = $( "#invZipCD"),
    $invAdrs = $( "#invAdrs"),
    $rcptZipCD = $("#rcptZipCD"),
    $rcptAdrs = $("#rcptAdrs"),
    $from = $("#from"),
    $tm = $("#tm"),
    $to = $("#to"),
    $tm1 = $("#tm1"),
    $requiredFields = $([]).add($invNmB).add($invTelOAreaCD).add($invTelONo).add($invZipCD).add($invAdrs).add($from).add($tm).add($to).add($tm1),
    $numberFields = $([]).add($invTelOAreaCD).add($invTelONo).add($invTelOExt).add($invFaxAreaCD).add($invFaxNo).add($invZipCD).add($rcptZipCD);

    $invNmB.data("name", '負責人');
    $invTelOAreaCD.data("name", '要保人 聯絡電話 區碼');
    $invTelONo.data("name", '要保人 聯絡電話');
    $invTelOExt.data("name", '要保人 聯絡電話 分機');
    $invFaxAreaCD.data("name", '要保人 傳真號碼 區碼');
    $invFaxNo.data("name", '要保人 傳真號碼');
    $invZipCD.data("name", '要保人 聯絡地址 郵遞區號');
    $invAdrs.data("name", '要保人 聯絡地址');
    $rcptZipCD.data("name", '收據 寄送地址 郵遞區號');
    $rcptAdrs.data("name", '收據 寄送地址');
    $from.data("name", '保險期間 起日');
    $tm.data("name", '保險期間 起時');
    $to.data("name", '保險期間 迄日');
    $tm1.data("name", '保險期間 迄時');

    //檢查必填欄位
    $requiredFields.each(function(){
        valid = validateRequired($(this)) && valid;
    });

    //檢查數值欄位
    $numberFields.each(function(){
        valid = validateNumber($(this)) && valid;
    });

    //檢查傳真號碼區碼與傳真號碼必須同時輸入
    if($.trim($invFaxNo.val()).length > 0){
        valid =  validateRequired($invFaxAreaCD) && valid;
    }
    
    //檢查是否有選擇方案
    var invCnt = 0;
    var invCustZeroCnt = 0;
     $('#projTbody tr[level="1"]').each(function() {
         if($(this).find('[id=invMK]').is(':checked')){
             invCnt = invCnt + 1;
             if(eval($(this).find('[id=invCustCnt]').val()) < 1){
                 invCustZeroCnt = invCustZeroCnt + 1;
             }
         }
     });

     if(invCnt == 0){
         updateTips(getMessage(uMsgRequiredTR, ['方案內容']), '', '');
         valid =  false && valid;
     }else if(invCustZeroCnt > 0){
         updateTips(getMessage(uMsgTourCustCnt, ['勾選方案 人數']), '', '');
         valid =  false && valid;
     }

    //檢查保期
    if(valid){
        //現在時間
        var now = new Date();
        //檢查時間 0~23
        valid = valid && validateHour($tm);
        //檢查日期格式欄位
        if(valid){
            valid = validateDate($from) && valid;
            valid = validateDate($to) && valid;
        }
        //檢查日期起值不得為現在之前
        if(valid){
            var fromDate = new Date($from.val());
            fromDate.setHours(parseInt(24));
            valid = validateDateInterval(now, fromDate, uNow, $from.data("name"));
        }
        //檢查日期起值不得大於迄值
        valid = valid && validateDateInterval(new Date($from.val()), new Date($to.val()), $from.data("name"), $to.data("name"));
    }

    if(valid){
        disabledBtn();
        composeProjDataJSON();
        $("#actionCD").val("INV");
        $("#inputDataId").val($('#dataID').val()+'-'+($('#dataIDVerNo').val()<10?'0':'')+$('#dataIDVerNo').val());
        $('#to').removeAttr('disabled');
        $('#tm').removeAttr('disabled');
        $('#tm1').removeAttr('disabled');
        $("#invForm").submit();
    }
}

function composeProjDataJSON() {
    var str;
    var projDataArr = new Array();
    $('#projTbody tr[level="1"]').each(function() {
        //fisher alert($.toJSON($(this).data()));
        str= '"projNum" : "' + $(this).find('[id=projNum]').val() + '",' +
             '"invMK" : "' + ($(this).find('[id=invMK]').is(':checked') ? 'Y' : 'N') + '",' +
             '"invCustCnt" : "' +$(this).find('[id=invCustCnt]').val() + '"' ;
        projDataArr.push(str);
    });
    $('#projDataJSON').val(array2JSONString(projDataArr));
}

function disabledBtn() {
    $('#actn_inquery').attr('disabled', true);
    $("#actn_result").attr('disabled', true);
    $("#actn_saveData").attr('disabled', true);
    $("#actn_invConfirm").attr('disabled', true);
    $("#actn_prtInv").attr('disabled', true);
}

function enabledBtn() {
    $('#actn_inquery').removeAttr('disabled');
    $("#actn_result").removeAttr('disabled');
    $("#actn_saveData").removeAttr('disabled');
    $("#actn_invConfirm").removeAttr('disabled');
    $("#actn_prtInv").removeAttr('disabled');
}

function initAct(act_cd) {
    if(act_cd=='CHG'){
        switch ($('#procStatusCD').val()){
            case  "G13"://要保輸入
                $('#addressBtn').show();
                $('#rcptAddressBtn').show();
                $("#actn_saveData").show();
                $("#actn_invConfirm").show();
                $("#actn_prtInv").hide();
                break;
            case  "G14"://要保輸入
                $('#addressBtn').hide();
                $('#rcptAddressBtn').hide();
                $("#actn_saveData").hide();
                $("#actn_invConfirm").hide();
                $("#actn_prtInv").show();
                break;
        }
    }else{
        $("#actn_saveData").hide();
        $("#actn_invConfirm").hide();
        $("#actn_prtInv").hide();
    }
}

function checkInput(editor) {
    $(editor).val(numLmt($(editor).val()));
}

function numLmt(str) {
    if(isNaN(str)){
        alert("請輸入數字!!!");
        str=0;
    }
    return str;
}

function isEndDt(str) {
    //判斷是否為月底日
    var yNum = eval(str.split('/')[0]);
    var mNum = eval('1'+str.split('/')[1])-100;
    var dNum = eval('1'+str.split('/')[2])-100;
    var tmpDate=$.datepicker.parseDate("yy/mm/dd", yNum + '/1/1');
    tmpDate.setMonth(mNum,0);
    return dNum == tmpDate.getDate();
}

function getGTL2optionS() {
    var $optionResponsibilityS=$('#optionResponsibilityS');
    var $optionCancel=$('#optionCancelS');
    var $Packagelost=$('#PackagelostS');
    var $Packagedelay=$('#PackagedelayS');
    var $Schedulechange=$('#SchedulechangeS');    
      
    $optionResponsibilityS.empty();
    $optionCancel.empty();

    $Packagelost.empty();
    $Packagedelay.empty();
    $Schedulechange.empty();   
    var CustAge15List=["","10||10","20||20","30||30","40||40"]; //Prototype模擬JSON回傳,正式開發再採用AJAX
                    $.each(CustAge15List, function(index, value){
                        if(index==0) {
                            var $option1_1 = createOption('', '10');
                            var $option1_2 = createOption('', '---請選擇---');  
                            var $option1_3 = createOption('', '---請選擇---'); 
                            
                            var $option2_1 = createOption('', '---請選擇---');
                            var $option2_2 = createOption('', '---請選擇---');  
                            var $option2_3 = createOption('', '---請選擇---'); 
                                                            
                            $optionResponsibilityS.append($option1_1);
                            $optionCancel.append($option1_2);

                            
                            $Packagelost.append($option2_1);
                            $Packagedelay.append($option2_2);
                            $Schedulechange.append($option2_3);
                          
                        }
                        else {
                            $option1_1 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));
                            $option1_2 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));
                            $option1_3 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));  
                            
                            $option2_1 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));
                            $option2_2 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));
                            $option2_3 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));                            
                            
                            $optionResponsibilityS.append($option1_1);
                            $optionCancel.append($option1_2);
 
                            
                            $Packagelost.append($option2_1);
                            $Packagedelay.append($option2_2);
                            $Schedulechange.append($option2_3);                            
                            

                        }
                    });    
    
}


function getGTL2ProjNM() {
    var $ProjNM = $('#ProjNM');
    $ProjNM.empty();
    var ProjNMList=["","A001||個人責任保險基本型","A002||個人責任保險基本型1","A003||個人責任保險基本型2"]; //Prototype模擬JSON回傳,正式開發再採用AJAX
    //alert(ProjNMList);
                    $.each(ProjNMList, function(index, value){
                        if(index==0) {
                            var $option1 = createOption('', '---請選擇---');
                            $ProjNM.append($option1);
                        }
                        else {
                            $option1 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));
                            $ProjNM.append($option1);
                        }
                    });
    
}

function deleteTR(deleter, dataKey) {
    var $TR = $(deleter).parent().parent().parent().parent().parent().parent();
    if(dataKey != null){
        $TR.parents('table').removeData(dataKey);
    }
    $TR.empty().remove();
}

function getGTL2TourAreaCDS() {

    var url =  contextPath + '/action/getGTL2TourAreaCD';
    var $tourAreaCD = $('#tourAreaCDS');

    $tourAreaCD.empty();

    $.ajax({url: url,
            type: 'POST',
            dataType: 'json',
            data: {'reasonCD': 'Y1'},
            async: false, // 使用同步查詢
            success: function (data) {
                if(data != null){
                    var tourAreaCDList1 = data.tourAreaCDList;
                    //alert(tourAreaCDList1.toString());
                    $.each(tourAreaCDList1, function(index, value){
                        if(index==0) {
                            var $option1 = createOption('', '---請選擇---');
                            $tourAreaCD.append($option1);
                        }
                        else {
                            $option1 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));
                            $tourAreaCD.append($option1);
                        }
                    });
                }
            }
    });
}


function getGTL2TourAreaCD() {

    var url =  contextPath + '/action/getGTL2TourAreaCD';
    var $tourAreaCD = $('#tourAreaCD');

    $tourAreaCD.empty();

    $.ajax({url: url,
            type: 'POST',
            dataType: 'json',
            data: {'reasonCD': 'Y1'},
            async: false, // 使用同步查詢
            success: function (data) {
                if(data != null){
                    var tourAreaCDList1 = data.tourAreaCDList;
                    //alert(tourAreaCDList1.toString());
                    $.each(tourAreaCDList1, function(index, value){
                        if(index==0) {
                            var $option1 = createOption('', '---請選擇---');
                            $tourAreaCD.append($option1);
                        }
                        else {
                            $option1 = createOption($.trim(value.split('||')[0]), $.trim(value.split('||')[1]));
                            $tourAreaCD.append($option1);
                        }
                    });
                }
            }
    });
}