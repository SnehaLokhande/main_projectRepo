jQuery.sap.declare("z_app_spare_parts.z_spare_parts1.util.MaterialCreation");
jQuery.sap.require("z_app_spare_parts.z_spare_parts1.util.SubClassContent");
jQuery.sap.require("z_app_spare_parts.z_spare_parts1.util.InputMatInformation");
z_app_spare_parts.z_spare_parts1.util.MaterialCreation = {};
var busyDialog = new sap.m.BusyDialog();
var ValidateClassFlag;
z_app_spare_parts.z_spare_parts1.util.MaterialCreation.formJSONFlatClassificationTree = function (that) {
		debugger;
		var classTreeJSON = that.ClassificationTreeJSON.results;
		var Class;
		var CharName;
		var CharVal;
		var Atkla;
		var New;
		var Mandatory;
		var ShortTextRel;
		var Atfor;
		var CharValOEMNum;
		that.ClassificationTreeJSONFlatStrc = {
			results: []
		};
		/*    var oViewID = that.getView().sId;
		    if (oViewID.search("newmaterial") > -1) {
		      iconTabBar = that.byId("idIconTabBarRequestNewMaterial");
		      CharValOEMNum = iconTabBar.getItems()[0].getContent()[0].getContent()[0].getItems()[1].getValue();
		      // var AtklaOEMNum
		      that.ClassificationTreeJSONFlatStrc.results.push({
		        Class: "TEST_SP",
		        Atnam: "TEST_OEM_NUM",
		        Atwrt: CharValOEMNum,
		        Atkla: "",
		        New: "",
		        LEAF: "",
		        Atfor: ""
		      });
		    } else if (oViewID.search("requestCopyMaterial") > -1) {
		      iconTabBar = that.byId("idIconTabBarRequestCopyMaterial");
		      CharValOEMNum = iconTabBar.getItems()[0].getContent()[1].getContent()[0].getItems()[1].getValue();
		    }*/
		for (var c = 0; c < classTreeJSON.length; c++) {
			for (var d = 0; d < classTreeJSON[c].ET_CLASS_CHARNav.results.length; d++) {
				Class = classTreeJSON[c].Class;
				CharVal = classTreeJSON[c].ET_CLASS_CHARNav.results[d].DEFVALUE;
				CharName = classTreeJSON[c].ET_CLASS_CHARNav.results[d].NAME;
				Atkla = classTreeJSON[c].ET_CLASS_CHARNav.results[d].Atkla;
				New = classTreeJSON[c].ET_CLASS_CHARNav.results[d].NEW;
				Leaf = classTreeJSON[c].LEAF;
				Mandatory = classTreeJSON[c].ET_CLASS_CHARNav.results[d].MANDATORY;
				ShortTextRel = classTreeJSON[c].ET_CLASS_CHARNav.results[d].SHORTTEXTREL;
				Atfor = classTreeJSON[c].ET_CLASS_CHARNav.results[d].DATATYP;

				that.ClassificationTreeJSONFlatStrc.results.push({
					Class: Class,
					Atnam: CharName,
					Atwrt: CharVal,
					Atkla: Atkla,
					New: New,
					Mandatory: Mandatory,
					ShortTextRel: ShortTextRel,
					Leaf: Leaf,
					Atfor: Atfor

				});
			}

		}
	},
	z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onValidateMaterialCreation = function (oControllerObjReqNewMat) {
		busyDialog.open();
		debugger;

		z_app_spare_parts.z_spare_parts1.util.MaterialCreation.formJSONFlatClassificationTree(oControllerObjReqNewMat);
		var shortText = oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").getText();
		shortText = shortText.substring(0, 40);
		var user_name_value = oControllerObjReqNewMat.getView().byId("idinputusername_value_ReqNewMat").getValue(); //get value for input
		var contact_value = oControllerObjReqNewMat.getView().byId("idinputcontact_value_ReqNewMat").getValue();
		var eol_flag_check = oControllerObjReqNewMat.getView().byId("idEOLFLAG_value_ReqNewMat").getSelected();
		var plant_value = oControllerObjReqNewMat.getView().byId("idplantinput_value_ReqNewMat").getValue();
		var purchase_code_num_value = oControllerObjReqNewMat.getView().byId("idinputpcn_value_ReqNewMat").getValue();
		var buom_value = oControllerObjReqNewMat.getView().byId("idBaseUOMinput_value_ReqNewMat").getValue();
		var consumable_value = oControllerObjReqNewMat.getView().byId("idcomboboxconsumable_value_ReqNewMat").getValue();
		// changed by Udit as complete value is needed
		/*consumable_value = consumable_value.charAt("0");*/
		//mrp
		var forcast_per_period_value = oControllerObjReqNewMat.getView().byId("idinputforecaseperiod_value_ReqNewMat").getValue();
		var quality_batch_value = oControllerObjReqNewMat.getView().byId("idinputquantityperbatch_value_ReqNewMat").getValue();
		var cost_centre_value = oControllerObjReqNewMat.getView().byId("idinputcostcenter_value_ReqNewMat").getValue();

		var period_value = oControllerObjReqNewMat.getView().byId("idinputperiod_value_ReqNewMat").getValue();
		var storage_check = oControllerObjReqNewMat.getView().byId("idcheckboxstoragronly_value_ReqNewMat").getSelected();
		if (storage_check == true) {
			storage_check = "X";
		} else {
			storage_check = "";
		}
		var remark_forecast_value = oControllerObjReqNewMat.getView().byId("idinputremarkforcast_value_ReqNewMat").getValue();
		var repair_check = oControllerObjReqNewMat.getView().byId("idcheckboxrepair_value_ReqNewMat").getSelected();
		if (repair_check == true) {
			repair_check = "X";
		} else {
			repair_check = "";
		}
		//pur
		var oem_vendor_value = oControllerObjReqNewMat.getView().byId("idinputfirstoemvendor_value_ReqNewMat").getValue();

		var oem_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").getValue();

		var sec_vendor_value = oControllerObjReqNewMat.getView().byId("idinputsecondvendor_value_ReqNewMat").getValue();

		var sec_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").getValue();
		
		

		//new req for adding third and fourth vendor and part number TB 28-1-19
	/*	var third_oem_vendor_value = oControllerObjReqNewMat.getView().byId("idinputthirdoemvendor_value_ReqNewMat").getValue();
		var third_oem_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartthird_value_ReqNewMat").getValue();
		var fourth_vendor_value = oControllerObjReqNewMat.getView().byId("idinputfourthvendor_value_ReqNewMat").getValue();
		var fourth_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartfourth_value_ReqNewMat").getValue();*/
		var third_vendor_value = oControllerObjReqNewMat.getView().byId("idinputthirdoemvendor_value_ReqNewMat").getValue();
		var third_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartthird_value_ReqNewMat").getValue();
		var fourth_vendor_value = oControllerObjReqNewMat.getView().byId("idinputfourthvendor_value_ReqNewMat").getValue();
		var fourth_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartfourth_value_ReqNewMat").getValue();
		//new req for adding third and fourth vendor and part number TB 28-1-19

		var critical_value = oControllerObjReqNewMat.getView().byId("idinputcriticalpart_value_ReqNewMat").getValue();
		//fin
		var profit_cen_value = oControllerObjReqNewMat.getView().byId("idinputprofitcentre_value_ReqNewMat").getValue();
		//wh
		var aut_serial_num_check = oControllerObjReqNewMat.getView().byId("idcheckboxautserialno_value_ReqNewMat").getSelected();
		if (aut_serial_num_check == true) {
			aut_serial_num_check = "X";
		} else {
			aut_serial_num_check = "";
		}

		var UOI_value = oControllerObjReqNewMat.getView().byId("idinputuoi_value_ReqNewMat").getValue();

		// var add_store_typ_value = oControllerObjReqNewMat.getView().byId("addstoreinputid_value_ReqNewMat").getValue();
		var add_store_typ_text = "";
		var add_store_typ_value = oControllerObjReqNewMat.getView().byId("addstoreinputid_value_ReqNewMat").getTokens();

		if (add_store_typ_value.length > 0) {
			for (var d = 0; d < add_store_typ_value.length; d++) {
				if (d == 0) {
					add_store_typ_text = add_store_typ_value[d].getText();
				} else {
					add_store_typ_text = add_store_typ_text + "," + add_store_typ_value[d].getText();
				}
			}
		}

		var serialnoproof_value = oControllerObjReqNewMat.getView().byId("idinputserialnoprof_value_ReqNewMat").getValue();

		var conversion_value = oControllerObjReqNewMat.getView().byId("idinputconversion_value_ReqNewMat").getValue();

		var remarks_spec_hand_value = oControllerObjReqNewMat.getView().byId("idinputremarks_value_ReqNewMat").getValue();

		var serial_level_hand_value = oControllerObjReqNewMat.getView().byId("idseriallevelinput_value_ReqNewMat").getValue();
		//qm
		var qua_insp_check = oControllerObjReqNewMat.getView().byId("idcheckboxqualityinspect_value_ReqNewMat").getSelected();
		if (qua_insp_check == true) {
			qua_insp_check = "X";
		} else {
			qua_insp_check = "";
		}

		var batch_manag_check = oControllerObjReqNewMat.getView().byId("idcheckboxbatchmanag_value_ReqNewMat").getSelected();
		if (batch_manag_check == true) {
			batch_manag_check = "X";
		} else {
			batch_manag_check = "";
		}

		var shel_life_check = oControllerObjReqNewMat.getView().byId("idcheckboxshelfile_value_ReqNewMat").getSelected();
		if (shel_life_check == true) {
			shel_life_check = "X";
		} else {
			shel_life_check = "";
		}
		//remarks
		var ReqComment = oControllerObjReqNewMat.getView().byId("idReqComment_value_ReqNewMat").getValue();
		var AttachmentFlag = "";
		if (oControllerObjReqNewMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").getData().results != undefined) {
			AttachmentFlag = "X"
		}
		busyDialog.open();
		$.support.cors = true;
		var oHeaders = {
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-Token": "Fetch",
			"Content-Type": "application/atom+xml",
			"DataServiceVersion": "2.0",
			"Accept": "application/atom+xml"
		};

		var iGETUrl = oControllerObjReqNewMat.getOwnerComponent().getModel("oDataModelSP").sServiceUrl;
		$.ajax({
			headers: oHeaders,
			url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet",
			type: "GET",
			async: false,
			timeout: 100000,
			error: function (data, oResponse) {
				//      debugger;
				busyDialog.close();
				sap.m.MessageBox
					.error(" Data fetch failed");
			},
			success: function (data, textStatus, jqXHR) {
				debugger;
				var token = jqXHR.getResponseHeader('x-csrf-token');

				var dataFinal = [];
				var dataString = "";

				dataFinal
					.push("<?xml version='1.0' encoding='UTF-8'?>" + "<atom:entry  xmlns:atom='http://www.w3.org/2005/Atom' " +
						"xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' " +
						"xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'>" + "<atom:content type='application/xml'>" +
						"<m:properties>" + "<d:Attachment>" + AttachmentFlag + "</d:Attachment>" + "<d:Dupliacte>" + oControllerObjReqNewMat.DuplicateFlag +
						"</d:Dupliacte>" + "<d:Matnr></d:Matnr>" + "<d:Maktx>" + shortText + "</d:Maktx>" + "<d:Werks>" + plant_value + "</d:Werks>" +
						"<d:PlantName></d:PlantName>" + "<d:Matkl>" + purchase_code_num_value + "</d:Matkl>" + "<d:Meins>" + buom_value + "</d:Meins>" +
						"<d:Lgort></d:Lgort>" +
						"<d:Ernam></d:Ernam>" + "<d:Erdat>2016-04-19T00:00:00</d:Erdat>" + "<d:Contact>" + contact_value + "</d:Contact>" + "<d:ValClass>" +
						consumable_value + "</d:ValClass>" + "<d:StorCb>" + storage_check + "</d:StorCb>" + "<d:ForcstPer>" + forcast_per_period_value +
						"</d:ForcstPer>" + "<d:Period>" + period_value + "</d:Period>" + "<d:ForRemrk>" + remark_forecast_value + "</d:ForRemrk>" +
						"<d:MrpQuan>" + quality_batch_value + "</d:MrpQuan>" + "<d:Repair>" + repair_check + "</d:Repair>" +
						"<d:EolCb>" + eol_flag_check + "</d:EolCb>" +
						"<d:OemVend>" +
						oem_vendor_value + "</d:OemVend>" +
						"<d:OemPart>" + oem_part_value + "</d:OemPart>" + "<d:OemPart2>" + sec_part_value + "</d:OemPart2>" + "<d:OemVend2>" +
						sec_vendor_value + "</d:OemVend2>" + 
						"<d:OemVend3>" + third_vendor_value + "</d:OemVend3>" + 
						"<d:OemPart3>" + third_part_value + "</d:OemPart3>" +
						"<d:OemVend4>" + fourth_vendor_value + "</d:OemVend4>" +
						"<d:OemPart4>" + fourth_part_value + "</d:OemPart4>" +
						
						
						"<d:CritPart>" + critical_value + "</d:CritPart>" + "<d:AutSer>" + aut_serial_num_check +
						"</d:AutSer>" + "<d:Serail>" + serialnoproof_value + "</d:Serail>" + "<d:Serlv>" + serial_level_hand_value + "</d:Serlv>" +
						"<d:Msehi>" + UOI_value + "</d:Msehi>" + "<d:Conv>" + conversion_value + "</d:Conv>" + "<d:Lgtyp>" + add_store_typ_text +
						"</d:Lgtyp>" + "<d:WhRemrk>" +
						remarks_spec_hand_value + "</d:WhRemrk>" + "<d:Prctr>" + profit_cen_value + "</d:Prctr>" + "<d:Kostl>" + cost_centre_value +
						"</d:Kostl>" + "<d:QualInsp>" + qua_insp_check + "</d:QualInsp>" + "<d:BatchMan>" + batch_manag_check + "</d:BatchMan>" +
						"<d:ShelfLife>" + shel_life_check + "</d:ShelfLife>" + "<d:ReqComment>" + ReqComment + "</d:ReqComment>" + "<d:Case>V</d:Case>" +
						"</m:properties>" + "</atom:content>" +
						"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_CLASSIF_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.HEADER2ITEM'>" +
						"<m:inline>" + "<atom:feed>");

				//loop start here
				for (var e = 0; e < oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results.length; e++) {
					dataFinal
						.push("<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" + "<d:Atauth></d:Atauth>" +
							"<d:Klbez></d:Klbez>" + "<d:Clint></d:Clint>" + "<d:Class>" + oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results[e].Class +
							"</d:Class>" + "<d:Atinn></d:Atinn>" + "<d:Atnam>" + oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results[e].Atnam +
							"</d:Atnam>" + "<d:Atwrt>" + oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results[e].Atwrt + "</d:Atwrt>" +
							"<d:Atflv>0</d:Atflv>" + "<d:Klart></d:Klart>" + "<d:Atkle>false</d:Atkle>" + "<d:Atkla>" + oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc
							.results[e].Atkla + "</d:Atkla>" + "<d:Atein>false</d:Atein>" + "<d:Msehi></d:Msehi>" + "<d:Atstd>false</d:Atstd>" + "<d:NewVal>" +
							oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results[e].New + "</d:NewVal>" + "<d:Atbez></d:Atbez>" + "</m:properties>" +
							"</atom:content>" + "</atom:entry>");
				}
				//loop end here

				dataFinal
					.push("</atom:feed>" + "</m:inline>" + "</atom:link>" + "</atom:entry>");

				debugger;
				var FinalData = '';
				var Final = '';
				for (var i = 0; i < dataFinal.length; i++) {
					FinalData = dataFinal.join('');
					// FinalData =
					// FinalData.replace(/\\/g, '')
				}
				var myHeadersend = {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"Accept": "application/json,application/atom+xml,application/xml,application/atomsvc+xml",
					"X-CSRF-Token": token
				};

				var iPOSTUrl = iGETUrl + "/ET_HEADER_DATASet";
				$.ajax({
					headers: myHeadersend,
					url: iPOSTUrl,
					type: "POST",
					data: FinalData,
					// // processData: false,
					async: false,
					error: function (data, oResponse) {
						busyDialog.close();
						sap.m.MessageBox
							.error(" Material Validation failed");
					},
					success: function (data, oResponse) {
						debugger;
						busyDialog.close();
						var Guid = data.d.GuiId;
						var reason;
						var stateDialog;
						var Matnr = data.d.Matnr;
						oControllerObjReqNewMat.ValidatedMatnr = Matnr;
						if (Matnr == "") {
							reason = data.d.ReqComment
							stateDialog = "Error";
						} else {
							/*reason = " Material : " + Matnr + " will be created "*/
							reason = " Material creation after Submit Only "
							stateDialog = "Success";
						}
						var oDialogSuccessMatCret = new sap.m.Dialog({
							title: "Message",
							type: "Message",
							state: stateDialog,
							content: [new sap.m.Text({
								text: reason
							})],
							endButton: new sap.m.Button({
								text: "Ok",
								press: function () {
									debugger;
									if (stateDialog == "Error") {
										oDialogSuccessMatCret.close();
										oDialogSuccessMatCret.destroy();
									} else {
										oDialogSuccessMatCret.close();
										oDialogSuccessMatCret.destroy();
										var oRouter = sap.ui.core.UIComponent.getRouterFor(oControllerObjReqNewMat);
										oRouter.navTo("ReviewReqNewMaterial");
									}
								}
							}),
						});
						oDialogSuccessMatCret.open();
					}

				});
			}
		});
	};
z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onSubmitMaterialCreation = function (oControllerObjReqNewMat,
	oControllerObjReviewReqNewMat) {
	busyDialog.open();
	debugger;

	z_app_spare_parts.z_spare_parts1.util.MaterialCreation.formJSONFlatClassificationTree(oControllerObjReqNewMat);
	var shortText = oControllerObjReviewReqNewMat.getView().byId("idShortText_ReviewReqNewMat").getText();
	shortText = shortText.substring(0, 40);
	var user_name_value = oControllerObjReviewReqNewMat.getView().byId("idinputusername_value_ReviewReqNewMat").getText(); //get value for input
	var contact_value = oControllerObjReviewReqNewMat.getView().byId("idinputcontact_value_ReviewReqNewMat").getText();
	var eol_flag_check = oControllerObjReviewReqNewMat.getView().byId("idEOLFLAG_value_ReviewReqNewMat").getSelected();
	var plant_value = oControllerObjReviewReqNewMat.getView().byId("idplantinput_value_ReviewReqNewMat").getText();
	var purchase_code_num_value = oControllerObjReviewReqNewMat.getView().byId("idinputpcn_value_ReviewReqNewMat").getText();
	var buom_value = oControllerObjReviewReqNewMat.getView().byId("idBaseUOMinput_value_ReviewReqNewMat").getText();
	var consumable_value = oControllerObjReviewReqNewMat.getView().byId("idcomboboxconsumable_value_ReviewReqNewMat").getText();
	// changed by Udit as now we need complete value
	/*consumable_value = consumable_value.charAt("0");*/
	//mrp
	var forcast_per_period_value = oControllerObjReviewReqNewMat.getView().byId("idinputforecaseperiod_value_ReviewReqNewMat").getText();
	var quality_batch_value = oControllerObjReviewReqNewMat.getView().byId("idinputquantityperbatch_value_ReviewReqNewMat").getText();
	var cost_centre_value = oControllerObjReviewReqNewMat.getView().byId("idinputcostcenter_value_ReviewReqNewMat").getText();

	var period_value = oControllerObjReviewReqNewMat.getView().byId("idinputperiod_value_ReviewReqNewMat").getText();
	var storage_check = oControllerObjReviewReqNewMat.getView().byId("idcheckboxstoragronly_value_ReviewReqNewMat").getSelected();
	if (storage_check == true) {
		storage_check = "X";
	} else {
		storage_check = "";
	}
	var remark_forecast_value = oControllerObjReviewReqNewMat.getView().byId("idinputremarkforcast_value_ReviewReqNewMat").getText();
	var repair_check = oControllerObjReviewReqNewMat.getView().byId("idcheckboxrepair_value_ReviewReqNewMat").getSelected();
	if (repair_check == true) {
		repair_check = "X";
	} else {
		repair_check = "";
	}
	//pur
	var oem_vendor_value = oControllerObjReviewReqNewMat.getView().byId("idinputfirstoemvendor_value_ReviewReqNewMat").getText();

	var oem_part_value = oControllerObjReviewReqNewMat.getView().byId("idinputoempartfirst_value_ReviewReqNewMat").getText();

	var sec_vendor_value = oControllerObjReviewReqNewMat.getView().byId("idinputsecondvendor_value_ReviewReqNewMat").getText();

	var sec_part_value = oControllerObjReviewReqNewMat.getView().byId("idinputoempartsecond_value_ReviewReqNewMat").getText();

	//new req for adding third and fourth vendor and part number TB 28-1-19
	/*var third_oem_vendor_value = oControllerObjReviewReqNewMat.getView().byId("idinputthirdoemvendor_value_ReviewReqNewMat").setText(
		third_oem_vendor_value);
	var third_oem_part_value = oControllerObjReviewReqNewMat.getView().byId("idinputoempartthird_value_ReviewReqNewMat").setText(
		third_oem_part_value);
	var fourth_vendor_value = oControllerObjReviewReqNewMat.getView().byId("idinputfourthvendor_value_ReviewReqNewMat").setText(
		fourth_vendor_value);
	var fourth_part_value = oControllerObjReviewReqNewMat.getView().byId("idinputoempartfourth_value_ReviewReqNewMat").setText(
		fourth_part_value);*/
		// udit-------------------------------
		/*var third_vendor_value = oControllerObjReviewReqNewMat.getView().byId("idinputthirdoemvendor_value_ReviewReqNewMat").setText(
		third_vendor_value);
	var third_part_value = oControllerObjReviewReqNewMat.getView().byId("idinputoempartthird_value_ReviewReqNewMat").setText(
		third_part_value);
	var fourth_vendor_value = oControllerObjReviewReqNewMat.getView().byId("idinputfourthvendor_value_ReviewReqNewMat").setText(
		fourth_vendor_value);
	var fourth_part_value = oControllerObjReviewReqNewMat.getView().byId("idinputoempartfourth_value_ReviewReqNewMat").setText(
		fourth_part_value);*/
		
			var third_vendor_value = oControllerObjReviewReqNewMat.getView().byId("idinputthirdoemvendor_value_ReviewReqNewMat").getText();

	var third_part_value = oControllerObjReviewReqNewMat.getView().byId("idinputoempartthird_value_ReviewReqNewMat").getText();

	var fourth_vendor_value = oControllerObjReviewReqNewMat.getView().byId("idinputfourthvendor_value_ReviewReqNewMat").getText();

	var fourth_part_value = oControllerObjReviewReqNewMat.getView().byId("idinputoempartfourth_value_ReviewReqNewMat").getText();
	//new req for adding third and fourth vendor and part number TB 28-1-19

	var critical_value = oControllerObjReviewReqNewMat.getView().byId("idinputcriticalpart_value_ReviewReqNewMat").getText();
	//fin
	var profit_cen_value = oControllerObjReviewReqNewMat.getView().byId("idinputprofitcentre_value_ReviewReqNewMat").getText();
	//wh
	var aut_serial_num_check = oControllerObjReviewReqNewMat.getView().byId("idcheckboxautserialno_value_ReviewReqNewMat").getSelected();
	if (aut_serial_num_check == true) {
		aut_serial_num_check = "X";
	} else {
		aut_serial_num_check = "";
	}

	var UOI_value = oControllerObjReviewReqNewMat.getView().byId("idinputuoi_value_ReviewReqNewMat").getText();

	// var add_store_typ_value = oControllerObjReviewReqNewMat.getView().byId("addstoreinputid_value_ReviewReqNewMat").getText();
	var add_store_typ_text = "";
	var add_store_typ_value = oControllerObjReviewReqNewMat.getView().byId("addstoreinputid_value_ReviewReqNewMat").getTokens();

	if (add_store_typ_value.length > 0) {
		for (var d = 0; d < add_store_typ_value.length; d++) {
			if (d == 0) {
				add_store_typ_text = add_store_typ_value[d].getText();
			} else {
				add_store_typ_text = add_store_typ_text + "," + add_store_typ_value[d].getText();
			}
		}
	}

	var serialnoproof_value = oControllerObjReviewReqNewMat.getView().byId("idinputserialnoprof_value_ReviewReqNewMat").getText();

	var conversion_value = oControllerObjReviewReqNewMat.getView().byId("idinputconversion_value_ReviewReqNewMat").getText();

	var remarks_spec_hand_value = oControllerObjReviewReqNewMat.getView().byId("idinputremarks_value_ReviewReqNewMat").getText();

	var serial_level_hand_value = oControllerObjReviewReqNewMat.getView().byId("idseriallevelinput_value_ReviewReqNewMat").getText();
	//qm
	var qua_insp_check = oControllerObjReviewReqNewMat.getView().byId("idcheckboxqualityinspect_value_ReviewReqNewMat").getSelected();
	if (qua_insp_check == true) {
		qua_insp_check = "X";
	} else {
		qua_insp_check = "";
	}

	var batch_manag_check = oControllerObjReviewReqNewMat.getView().byId("idcheckboxbatchmanag_value_ReviewReqNewMat").getSelected();
	if (batch_manag_check == true) {
		batch_manag_check = "X";
	} else {
		batch_manag_check = "";
	}

	var shel_life_check = oControllerObjReviewReqNewMat.getView().byId("idcheckboxshelfile_value_ReviewReqNewMat").getSelected();
	if (shel_life_check == true) {
		shel_life_check = "X";
	} else {
		shel_life_check = "";
	}
	//remarks
	var ReqComment = oControllerObjReqNewMat.getView().byId("idReqComment_value_ReqNewMat").getValue();
	oControllerObjReviewReqNewMat.getView().byId("idReqComment_value_ReviewReqNewMat").setText(ReqComment);
	var AttachmentFlag = "";
	if (oControllerObjReviewReqNewMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").getData().results != undefined) {
		AttachmentFlag = "X"
	}
	busyDialog.open();
	$.support.cors = true;
	var oHeaders = {
		"X-Requested-With": "XMLHttpRequest",
		"X-CSRF-Token": "Fetch",
		"Content-Type": "application/atom+xml",
		"DataServiceVersion": "2.0",
		"Accept": "application/atom+xml"
	};

	var iGETUrl = oControllerObjReviewReqNewMat.getOwnerComponent().getModel("oDataModelSP").sServiceUrl;
	$.ajax({
		headers: oHeaders,
		url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet",
		type: "GET",
		async: false,
		timeout: 100000,
		error: function (data, oResponse) {
			//      debugger;
			busyDialog.close();
			sap.m.MessageBox
				.error(" Data fetch failed");
		},
		success: function (data, textStatus, jqXHR) {
			debugger;
			var token = jqXHR.getResponseHeader('x-csrf-token');

			var dataFinal = [];
			var dataString = "";

			dataFinal
				.push("<?xml version='1.0' encoding='UTF-8'?>" + "<atom:entry  xmlns:atom='http://www.w3.org/2005/Atom' " +
					"xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' " +
					"xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'>" + "<atom:content type='application/xml'>" +
					"<m:properties>" + "<d:Attachment>" + AttachmentFlag + "</d:Attachment>" + "<d:Dupliacte>" + oControllerObjReqNewMat.DuplicateFlag +
					"</d:Dupliacte>" + "<d:Matnr>" + oControllerObjReqNewMat.ValidatedMatnr + "</d:Matnr>" + "<d:Maktx>" + shortText + "</d:Maktx>" +
					"<d:Werks>" + plant_value + "</d:Werks>" +
					"<d:PlantName></d:PlantName>" + "<d:Matkl>" + purchase_code_num_value + "</d:Matkl>" + "<d:Meins>" + buom_value + "</d:Meins>" +
					"<d:Lgort></d:Lgort>" +
					"<d:Ernam></d:Ernam>" + "<d:Erdat>2016-04-19T00:00:00</d:Erdat>" + "<d:Contact>" + contact_value + "</d:Contact>" + "<d:ValClass>" +
					consumable_value + "</d:ValClass>" + "<d:StorCb>" + storage_check + "</d:StorCb>" + "<d:ForcstPer>" + forcast_per_period_value +
					"</d:ForcstPer>" + "<d:Period>" + period_value + "</d:Period>" + "<d:ForRemrk>" + remark_forecast_value + "</d:ForRemrk>" +
					"<d:MrpQuan>" + quality_batch_value + "</d:MrpQuan>" + "<d:Repair>" + repair_check + "</d:Repair>" +
					"<d:EolCb>" + eol_flag_check + "</d:EolCb>" +
					"<d:OemVend>" +
					oem_vendor_value + "</d:OemVend>" +
					"<d:OemPart>" + oem_part_value + "</d:OemPart>" + "<d:OemPart2>" + sec_part_value + "</d:OemPart2>" + "<d:OemVend2>" +
					sec_vendor_value + "</d:OemVend2>" +
					"<d:OemVend3>" + third_vendor_value + "</d:OemVend3>" + 
						"<d:OemPart3>" + third_part_value + "</d:OemPart3>" +
						"<d:OemVend4>" + fourth_vendor_value + "</d:OemVend4>" +
						"<d:OemPart4>" + fourth_part_value + "</d:OemPart4>" +
					
					"<d:CritPart>" + critical_value + "</d:CritPart>" + "<d:AutSer>" + aut_serial_num_check +
					"</d:AutSer>" + "<d:Serail>" + serialnoproof_value + "</d:Serail>" + "<d:Serlv>" + serial_level_hand_value + "</d:Serlv>" +
					"<d:Msehi>" + UOI_value + "</d:Msehi>" + "<d:Conv>" + conversion_value + "</d:Conv>" + "<d:Lgtyp>" + add_store_typ_text +
					"</d:Lgtyp>" + "<d:WhRemrk>" +
					remarks_spec_hand_value + "</d:WhRemrk>" + "<d:Prctr>" + profit_cen_value + "</d:Prctr>" + "<d:Kostl>" + cost_centre_value +
					"</d:Kostl>" + "<d:QualInsp>" + qua_insp_check + "</d:QualInsp>" + "<d:BatchMan>" + batch_manag_check + "</d:BatchMan>" +
					"<d:ShelfLife>" + shel_life_check + "</d:ShelfLife>" + "<d:ReqComment>" + ReqComment + "</d:ReqComment>" + "<d:Case>C</d:Case>" +
					"</m:properties>" + "</atom:content>" +
					"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_CLASSIF_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.HEADER2ITEM'>" +
					"<m:inline>" + "<atom:feed>");

			//loop start here
			for (var e = 0; e < oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results.length; e++) {
				dataFinal
					.push("<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" + "<d:Atauth></d:Atauth>" +
						"<d:Klbez></d:Klbez>" + "<d:Clint></d:Clint>" + "<d:Class>" + oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results[e].Class +
						"</d:Class>" + "<d:Atinn></d:Atinn>" + "<d:Atnam>" + oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results[e].Atnam +
						"</d:Atnam>" + "<d:Atwrt>" + oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results[e].Atwrt + "</d:Atwrt>" +
						"<d:Atflv>0</d:Atflv>" + "<d:Klart></d:Klart>" + "<d:Atkle>false</d:Atkle>" + "<d:Atkla>" + oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc
						.results[e].Atkla + "</d:Atkla>" + "<d:Atein>false</d:Atein>" + "<d:Msehi></d:Msehi>" + "<d:Atstd>false</d:Atstd>" + "<d:NewVal>" +
						oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results[e].New + "</d:NewVal>" + "<d:Atbez></d:Atbez>" + "</m:properties>" +
						"</atom:content>" + "</atom:entry>");
			}
			//loop end here

			dataFinal
				.push("</atom:feed>" + "</m:inline>" + "</atom:link>" + "</atom:entry>");

			debugger;
			var FinalData = '';
			var Final = '';
			for (var i = 0; i < dataFinal.length; i++) {
				FinalData = dataFinal.join('');
				// FinalData =
				// FinalData.replace(/\\/g, '')
			}
			var myHeadersend = {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/atom+xml",
				"DataServiceVersion": "2.0",
				"Accept": "application/json,application/atom+xml,application/xml,application/atomsvc+xml",
				"X-CSRF-Token": token
			};

			var iPOSTUrl = iGETUrl + "/ET_HEADER_DATASet";
			$.ajax({
				headers: myHeadersend,
				url: iPOSTUrl,
				type: "POST",
				data: FinalData,
				// // processData: false,
				async: false,
				error: function (data, oResponse) {
					busyDialog.close();
					sap.m.MessageBox
						.error(" Material Creation failed");
				},
				success: function (data, oResponse) {
					debugger;
					busyDialog.close();
					var Guid = data.d.GuiId;
					var Matnr = data.d.Matnr;
					oSearchController.ReqNewMatBtnClickFlag = false;
					var oDialogSuccessMatCret = new sap.m.Dialog({
						title: "Message",
						type: "Message",
						content: [new sap.m.Text({
							text: " Material : " + Matnr + " will be created "
							/*text: " Material Creation After Submit only "*/
						})],
						endButton: new sap.m.Button({
							text: "Ok",
							press: function () {
								debugger;
								z_app_spare_parts.z_spare_parts1.util.SubClassContent.clearClassificationTreeReqNewMat(oControllerObjReqNewMat);
								z_app_spare_parts.z_spare_parts1.util.SubClassContent.clearClassificationTreeSearch(oSearchController);
								oControllerObjReqNewMat.DuplicateFlag = "";
								oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").setText("");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
								oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
								z_app_spare_parts.z_spare_parts1.util.InputMatInformation.clearInputMatInformationReqNewMat(oControllerObjReqNewMat);
								oDialogSuccessMatCret.close();
								oDialogSuccessMatCret.destroy();
								oControllerObjReqNewMat.ClassificationTreeJSON = {
									results: []
								};
								oControllerObjReviewReqNewMat.ClassificationTreeJSON = {
									results: []
								};
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
								var oRouter = sap.ui.core.UIComponent.getRouterFor(oControllerObjReviewReqNewMat);
								oRouter.navTo("search");

							}
						}),
					});
					oDialogSuccessMatCret.open();

					//  sap.m.MessageBox
					// .success(" Material Creation successfull");
					if (oControllerObjReqNewMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").getData().results != undefined) {
						var oModel = oControllerObjReqNewMat.getOwnerComponent().getModel("oDataModelSP");
						//  /sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/ZC_MM_GET_CONFIG(p_appl='SPARE_PART',p_field='WERKS')/Set
						// var that = this;
						var attachModelData = oControllerObjReqNewMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").getData().results;
						var Last = "";
						var oneLessAttachModelDatalength = attachModelData.length - 1;
						var index = "";

						if (attachModelData.length == 1) {
							LAST = "X";
							index = 0;
							z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjReqNewMat, Guid, attachModelData,
								LAST, index);
						} else if (attachModelData.length > 1) {
							for (var y = 0; y < attachModelData.length; y++) {
								if (y < oneLessAttachModelDatalength) {
									LAST = "";
									index = y;
									z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjReqNewMat, Guid,
										attachModelData, LAST, index);
								} else if (y == oneLessAttachModelDatalength) {
									LAST = "X";
									index = y;
									z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjReqNewMat, Guid,
										attachModelData, LAST, index);
								}
							}
						}
					}

				}

			});
		}
	});
};
z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onValidateMaterialCreationCopyMat = function (oControllerObjReqCopyMat) {
		busyDialog.open();
		debugger;

		z_app_spare_parts.z_spare_parts1.util.MaterialCreation.formJSONFlatClassificationTree(oControllerObjReqCopyMat);
		var shortText = oControllerObjReqCopyMat.getView().byId("idShortText_ReqCopyMat").getText();
		shortText = shortText.substring(0, 40);
		var user_name_value = oControllerObjReqCopyMat.getView().byId("idinputusername_value_ReqCopyMat").getValue(); //get value for input
		var contact_value = oControllerObjReqCopyMat.getView().byId("idinputcontact_value_ReqCopyMat").getValue();
		var eol_flag_check = oControllerObjReqCopyMat.getView().byId("idEOLFLAG_value_ReqCopyMat").getSelected();
		var plant_value = oControllerObjReqCopyMat.getView().byId("idplantinput_value_ReqCopyMat").getValue();
		var purchase_code_num_value = oControllerObjReqCopyMat.getView().byId("idinputpcn_value_ReqCopyMat").getValue();
		var buom_value = oControllerObjReqCopyMat.getView().byId("idBaseUOMinput_value_ReqCopyMat").getValue();
		var consumable_value = oControllerObjReqCopyMat.getView().byId("idcomboboxconsumable_value_ReqCopyMat").getValue();
		// commented by Udit as now we need complete value
		/*consumable_value = consumable_value.charAt("0");*/
		//mrp
		var forcast_per_period_value = oControllerObjReqCopyMat.getView().byId("idinputforecaseperiod_value_ReqCopyMat").getValue();
		var quality_batch_value = oControllerObjReqCopyMat.getView().byId("idinputquantityperbatch_value_ReqCopyMat").getValue();
		var cost_centre_value = oControllerObjReqCopyMat.getView().byId("idinputcostcenter_value_ReqCopyMat").getValue();

		var period_value = oControllerObjReqCopyMat.getView().byId("idinputperiod_value_ReqCopyMat").getValue();
		var storage_check = oControllerObjReqCopyMat.getView().byId("idcheckboxstoragronly_value_ReqCopyMat").getSelected();
		if (storage_check == true) {
			storage_check = "X";
		} else {
			storage_check = "";
		}
		var remark_forecast_value = oControllerObjReqCopyMat.getView().byId("idinputremarkforcast_value_ReqCopyMat").getValue();
		var repair_check = oControllerObjReqCopyMat.getView().byId("idcheckboxrepair_value_ReqCopyMat").getSelected();
		if (repair_check == true) {
			repair_check = "X";
		} else {
			repair_check = "";
		}
		//pur
		var oem_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").getValue();

		var oem_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartfirst_value_ReqCopyMat").getValue();

		var sec_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputsecondvendor_value_ReqCopyMat").getValue();

		var sec_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartsecond_value_ReqCopyMat").getValue();

		//new req for adding third and fourth vendor and part number TB 28-1-19
		 /*var third_oem_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputthirdoemvendor_value_ReviewReqNewMat").getValue();
		 var third_oem_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartthird_value_ReviewReqNewMat").getValue();
		 var fourth_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputfourthvendor_value_ReviewReqNewMat").getValue();
		var fourth_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartfourth_value_ReviewReqNewMat").getValue();*/
		/*
		var third_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputthirdoemvendor_value_ReviewReqNewMat").getValue();
		 var third_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartthird_value_ReviewReqNewMat").getValue();
		 var fourth_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputfourthvendor_value_ReviewReqNewMat").getValue();
		var fourth_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartfourth_value_ReviewReqNewMat").getValue();*/
		var third_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").getValue();
		 var third_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartthird_value_ReqCopyMat").getValue();
		 var fourth_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputfourthvendor_value_ReqCopyMat").getValue();
		var fourth_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartfourth_value_ReqCopyMat").getValue();
		//new req for adding third and fourth vendor and part number TB 28-1-19

		var critical_value = oControllerObjReqCopyMat.getView().byId("idinputcriticalpart_value_ReqCopyMat").getValue();
		//fin
		var profit_cen_value = oControllerObjReqCopyMat.getView().byId("idinputprofitcentre_value_ReqCopyMat").getValue();
		//wh
		var aut_serial_num_check = oControllerObjReqCopyMat.getView().byId("idcheckboxautserialno_value_ReqCopyMat").getSelected();
		if (aut_serial_num_check == true) {
			aut_serial_num_check = "X";
		} else {
			aut_serial_num_check = "";
		}

		var UOI_value = oControllerObjReqCopyMat.getView().byId("idinputuoi_value_ReqCopyMat").getValue();

		// var add_store_typ_value = oControllerObjReqCopyMat.getView().byId("addstoreinputid_value_ReqCopyMat").getValue();
		var add_store_typ_text = "";
		var add_store_typ_value = oControllerObjReqCopyMat.getView().byId("addstoreinputid_value_ReqCopyMat").getTokens();

		if (add_store_typ_value.length > 0) {
			for (var d = 0; d < add_store_typ_value.length; d++) {
				if (d == 0) {
					add_store_typ_text = add_store_typ_value[d].getText();
				} else {
					add_store_typ_text = add_store_typ_text + "," + add_store_typ_value[d].getText();
				}
			}
		}

		var serialnoproof_value = oControllerObjReqCopyMat.getView().byId("idinputserialnoprof_value_ReqCopyMat").getValue();

		var conversion_value = oControllerObjReqCopyMat.getView().byId("idinputconversion_value_ReqCopyMat").getValue();

		var remarks_spec_hand_value = oControllerObjReqCopyMat.getView().byId("idinputremarks_value_ReqCopyMat").getValue();

		var serial_level_hand_value = oControllerObjReqCopyMat.getView().byId("idseriallevelinput_value_ReqCopyMat").getValue();
		//qm
		var qua_insp_check = oControllerObjReqCopyMat.getView().byId("idcheckboxqualityinspect_value_ReqCopyMat").getSelected();
		if (qua_insp_check == true) {
			qua_insp_check = "X";
		} else {
			qua_insp_check = "";
		}

		var batch_manag_check = oControllerObjReqCopyMat.getView().byId("idcheckboxbatchmanag_value_ReqCopyMat").getSelected();
		if (batch_manag_check == true) {
			batch_manag_check = "X";
		} else {
			batch_manag_check = "";
		}

		var shel_life_check = oControllerObjReqCopyMat.getView().byId("idcheckboxshelfile_value_ReqCopyMat").getSelected();
		if (shel_life_check == true) {
			shel_life_check = "X";
		} else {
			shel_life_check = "";
		}
		//remarks
		var ReqComment = oControllerObjReqCopyMat.getView().byId("idReqComment_value_ReqCopyMat").getValue();
		var AttachmentFlag = "";
		if (oControllerObjReqCopyMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").getData().results != undefined) {
			AttachmentFlag = "X"
		}
		busyDialog.open();
		$.support.cors = true;
		var oHeaders = {
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-Token": "Fetch",
			"Content-Type": "application/atom+xml",
			"DataServiceVersion": "2.0",
			"Accept": "application/atom+xml"
		};

		var iGETUrl = oControllerObjReqCopyMat.getOwnerComponent().getModel("oDataModelSP").sServiceUrl;
		$.ajax({
			headers: oHeaders,
			url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet",
			type: "GET",
			async: false,
			timeout: 100000,
			error: function (data, oResponse) {
				//      debugger;
				busyDialog.close();
				sap.m.MessageBox
					.error(" Data fetch failed");
			},
			success: function (data, textStatus, jqXHR) {
				debugger;
				var token = jqXHR.getResponseHeader('x-csrf-token');

				var dataFinal = [];
				var dataString = "";

				dataFinal
					.push("<?xml version='1.0' encoding='UTF-8'?>" + "<atom:entry  xmlns:atom='http://www.w3.org/2005/Atom' " +
						"xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' " +
						"xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'>" + "<atom:content type='application/xml'>" +
						"<m:properties>" + "<d:Attachment>" + AttachmentFlag + "</d:Attachment>" + "<d:Dupliacte>" + oControllerObjReqCopyMat.DuplicateFlag +
						"</d:Dupliacte>" + "<d:Matnr></d:Matnr>" + "<d:Maktx>" + shortText + "</d:Maktx>" + "<d:Werks>" + plant_value + "</d:Werks>" +
						"<d:PlantName></d:PlantName>" + "<d:Matkl>" + purchase_code_num_value + "</d:Matkl>" + "<d:Meins>" + buom_value + "</d:Meins>" +
						"<d:Lgort></d:Lgort>" +
						"<d:Ernam></d:Ernam>" + "<d:Erdat>2016-04-19T00:00:00</d:Erdat>" + "<d:Contact>" + contact_value + "</d:Contact>" + "<d:ValClass>" +
						consumable_value + "</d:ValClass>" + "<d:StorCb>" + storage_check + "</d:StorCb>" + "<d:ForcstPer>" + forcast_per_period_value +
						"</d:ForcstPer>" + "<d:Period>" + period_value + "</d:Period>" + "<d:ForRemrk>" + remark_forecast_value + "</d:ForRemrk>" +
						"<d:MrpQuan>" + quality_batch_value + "</d:MrpQuan>" + "<d:Repair>" + repair_check + "</d:Repair>" +
						"<d:EolCb>" + eol_flag_check + "</d:EolCb>" +
						"<d:OemVend>" +
						oem_vendor_value + "</d:OemVend>" +
						"<d:OemPart>" + oem_part_value + "</d:OemPart>" + "<d:OemPart2>" + sec_part_value + "</d:OemPart2>" + "<d:OemVend2>" +
						sec_vendor_value + "</d:OemVend2>" +
						
						"<d:OemVend3>" + third_vendor_value + "</d:OemVend3>" + 
						"<d:OemPart3>" + third_part_value + "</d:OemPart3>" +
						"<d:OemVend4>" + fourth_vendor_value + "</d:OemVend4>" +
						"<d:OemPart4>" + fourth_part_value + "</d:OemPart4>" +
						
						"<d:CritPart>" + critical_value + "</d:CritPart>" + "<d:AutSer>" + aut_serial_num_check +
						"</d:AutSer>" + "<d:Serail>" + serialnoproof_value + "</d:Serail>" + "<d:Serlv>" + serial_level_hand_value + "</d:Serlv>" +
						"<d:Msehi>" + UOI_value + "</d:Msehi>" + "<d:Conv>" + conversion_value + "</d:Conv>" + "<d:Lgtyp>" + add_store_typ_text +
						"</d:Lgtyp>" + "<d:WhRemrk>" +
						remarks_spec_hand_value + "</d:WhRemrk>" + "<d:Prctr>" + profit_cen_value + "</d:Prctr>" + "<d:Kostl>" + cost_centre_value +
						"</d:Kostl>" + "<d:QualInsp>" + qua_insp_check + "</d:QualInsp>" + "<d:BatchMan>" + batch_manag_check + "</d:BatchMan>" +
						"<d:ShelfLife>" + shel_life_check + "</d:ShelfLife>" + "<d:ReqComment>" + ReqComment + "</d:ReqComment>" + "<d:Case>V</d:Case>" +
						"</m:properties>" + "</atom:content>" +
						"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_CLASSIF_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.HEADER2ITEM'>" +
						"<m:inline>" + "<atom:feed>");

				//loop start here
				for (var e = 0; e < oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results.length; e++) {
					dataFinal
						.push("<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" + "<d:Atauth></d:Atauth>" +
							"<d:Klbez></d:Klbez>" + "<d:Clint></d:Clint>" + "<d:Class>" + oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results[e].Class +
							"</d:Class>" + "<d:Atinn></d:Atinn>" + "<d:Atnam>" + oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results[e].Atnam +
							"</d:Atnam>" + "<d:Atwrt>" + oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results[e].Atwrt + "</d:Atwrt>" +
							"<d:Atflv>0</d:Atflv>" + "<d:Klart></d:Klart>" + "<d:Atkle>false</d:Atkle>" + "<d:Atkla>" + oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc
							.results[e].Atkla + "</d:Atkla>" + "<d:Atein>false</d:Atein>" + "<d:Msehi></d:Msehi>" + "<d:Atstd>false</d:Atstd>" + "<d:NewVal>" +
							oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results[e].New + "</d:NewVal>" + "<d:Atbez></d:Atbez>" +
							"</m:properties>" +
							"</atom:content>" + "</atom:entry>");
				}
				//loop end here

				dataFinal
					.push("</atom:feed>" + "</m:inline>" + "</atom:link>" + "</atom:entry>");

				debugger;
				var FinalData = '';
				var Final = '';
				for (var i = 0; i < dataFinal.length; i++) {
					FinalData = dataFinal.join('');
					// FinalData =
					// FinalData.replace(/\\/g, '')
				}
				var myHeadersend = {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"Accept": "application/json,application/atom+xml,application/xml,application/atomsvc+xml",
					"X-CSRF-Token": token
				};

				var iPOSTUrl = iGETUrl + "/ET_HEADER_DATASet";
				$.ajax({
					headers: myHeadersend,
					url: iPOSTUrl,
					type: "POST",
					data: FinalData,
					// // processData: false,
					async: false,
					error: function (data, oResponse) {
						busyDialog.close();
						sap.m.MessageBox
							.error(" Material Validation failed");
					},
					success: function (data, oResponse) {
						debugger;
						busyDialog.close();
						var Guid = data.d.GuiId;
						var reason;
						var stateDialog;
						var Matnr = data.d.Matnr;
						oControllerObjReqCopyMat.ValidatedMatnr = Matnr;
						if (Matnr == "") {
							reason = data.d.ReqComment
							stateDialog = "Error";
						} else {
							/*reason = " Material : " + Matnr + " will be created "*/
							reason = " Material Creation After Submit only "
							
							stateDialog = "Success";
						}
						var oDialogSuccessMatCret = new sap.m.Dialog({
							title: "Message",
							type: "Message",
							state: stateDialog,
							content: [new sap.m.Text({
								text: reason
							})],
							endButton: new sap.m.Button({
								text: "Ok",
								press: function () {
									debugger;
									if (stateDialog == "Error") {
										oDialogSuccessMatCret.close();
										oDialogSuccessMatCret.destroy();
									} else {
										oDialogSuccessMatCret.close();
										oDialogSuccessMatCret.destroy();
										var oRouter = sap.ui.core.UIComponent.getRouterFor(oControllerObjReqCopyMat);
										oRouter.navTo("ReviewReqCopyMaterial");
									}
								}
							}),
						});
						oDialogSuccessMatCret.open();
					}

				});
			}
		});

	},
	z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onSubmitMaterialCreationCopyMat = function (oControllerObjReqCopyMat,
		oControllerObjReviewReqCopyMat) {
		debugger;
		busyDialog.open();
		// var oDataModelPCN = that.getOwnerComponent().getModel("oDataModelPCN");
		// oModel.read("/ZC_MM_PCN_LIST(p_appl='SPARE_PART')/Set", null, null, true,
		z_app_spare_parts.z_spare_parts1.util.MaterialCreation.formJSONFlatClassificationTree(oControllerObjReqCopyMat);
		var shortText = oControllerObjReviewReqCopyMat.getView().byId("idShortText_ReviewReqCopyMat").getText();
		shortText = shortText.substring(0, 40);
		var user_name_value = oControllerObjReviewReqCopyMat.getView().byId("idinputusername_value_ReviewReqCopyMat").getText(); //get value for input
		var contact_value = oControllerObjReviewReqCopyMat.getView().byId("idinputcontact_value_ReviewReqCopyMat").getText();
		var eol_flag_check = oControllerObjReviewReqCopyMat.getView().byId("idEOLFLAG_value_ReviewReqCopyMat").getSelected();
		var plant_value = oControllerObjReviewReqCopyMat.getView().byId("idplantinput_value_ReviewReqCopyMat").getText();
		var purchase_code_num_value = oControllerObjReviewReqCopyMat.getView().byId("idinputpcn_value_ReviewReqCopyMat").getText();
		var buom_value = oControllerObjReviewReqCopyMat.getView().byId("idBaseUOMinput_value_ReviewReqCopyMat").getText();
		var consumable_value = oControllerObjReviewReqCopyMat.getView().byId("idcomboboxconsumable_value_ReviewReqCopyMat").getText();
		//commented by Udit now we need complete value
		/*consumable_value = consumable_value.charAt("0");*/
		//mrp
		var forcast_per_period_value = oControllerObjReviewReqCopyMat.getView().byId("idinputforecaseperiod_value_ReviewReqCopyMat").getText();
		var quality_batch_value = oControllerObjReviewReqCopyMat.getView().byId("idinputquantityperbatch_value_ReviewReqCopyMat").getText();
		var cost_centre_value = oControllerObjReviewReqCopyMat.getView().byId("idinputcostcenter_value_ReviewReqCopyMat").getText();

		var period_value = oControllerObjReviewReqCopyMat.getView().byId("idinputperiod_value_ReviewReqCopyMat").getText();
		var storage_check = oControllerObjReviewReqCopyMat.getView().byId("idcheckboxstoragronly_value_ReviewReqCopyMat").getSelected();
		if (storage_check == true) {
			storage_check = "X";
		} else {
			storage_check = "";
		}
		var remark_forecast_value = oControllerObjReviewReqCopyMat.getView().byId("idinputremarkforcast_value_ReviewReqCopyMat").getText();
		var repair_check = oControllerObjReviewReqCopyMat.getView().byId("idcheckboxrepair_value_ReviewReqCopyMat").getSelected();
		if (repair_check == true) {
			repair_check = "X";
		} else {
			repair_check = "";
		}
		//pur
		var oem_vendor_value = oControllerObjReviewReqCopyMat.getView().byId("idinputfirstoemvendor_value_ReviewReqCopyMat").getText();

		var oem_part_value = oControllerObjReviewReqCopyMat.getView().byId("idinputoempartfirst_value_ReviewReqCopyMat").getText();

		var sec_vendor_value = oControllerObjReviewReqCopyMat.getView().byId("idinputsecondvendor_value_ReviewReqCopyMat").getText();

		var sec_part_value = oControllerObjReviewReqCopyMat.getView().byId("idinputoempartsecond_value_ReviewReqCopyMat").getText();
		
		//udit start-------------------------------------------------
		
		var third_vendor_value = oControllerObjReviewReqCopyMat.getView().byId("idinputthirdoemvendor_value_ReviewReqCopyMat").getText();

		var third_part_value = oControllerObjReviewReqCopyMat.getView().byId("idinputoempartthird_value_ReviewReqCopyMat").getText();

		var fourth_vendor_value = oControllerObjReviewReqCopyMat.getView().byId("idinputfourthvendor_value_ReviewReqCopyMat").getText();

		var fourth_part_value = oControllerObjReviewReqCopyMat.getView().byId("idinputoempartfourth_value_ReviewReqCopyMat").getText();
		
		

		var critical_value = oControllerObjReviewReqCopyMat.getView().byId("idinputcriticalpart_value_ReviewReqCopyMat").getText();
		//fin
		var profit_cen_value = oControllerObjReviewReqCopyMat.getView().byId("idinputprofitcentre_value_ReviewReqCopyMat").getText();
		//wh
		var aut_serial_num_check = oControllerObjReviewReqCopyMat.getView().byId("idcheckboxautserialno_value_ReviewReqCopyMat").getSelected();
		if (aut_serial_num_check == true) {
			aut_serial_num_check = "X";
		} else {
			aut_serial_num_check = "";
		}

		var UOI_value = oControllerObjReviewReqCopyMat.getView().byId("idinputuoi_value_ReviewReqCopyMat").getText();

		// var add_store_typ_value = oControllerObjReviewReqCopyMat.getView().byId("addstoreinputid_value_ReviewReqCopyMat").getText();
		var add_store_typ_text = "";
		var add_store_typ_value = oControllerObjReviewReqCopyMat.getView().byId("addstoreinputid_value_ReviewReqCopyMat").getTokens();

		if (add_store_typ_value.length > 0) {
			for (var d = 0; d < add_store_typ_value.length; d++) {
				if (d == 0) {
					add_store_typ_text = add_store_typ_value[d].getText();
				} else {
					add_store_typ_text = add_store_typ_text + "," + add_store_typ_value[d].getText();
				}
			}
		}

		var serialnoproof_value = oControllerObjReviewReqCopyMat.getView().byId("idinputserialnoprof_value_ReviewReqCopyMat").getText();

		var conversion_value = oControllerObjReviewReqCopyMat.getView().byId("idinputconversion_value_ReviewReqCopyMat").getText();

		var remarks_spec_hand_value = oControllerObjReviewReqCopyMat.getView().byId("idinputremarks_value_ReviewReqCopyMat").getText();

		var serial_level_hand_value = oControllerObjReviewReqCopyMat.getView().byId("idseriallevelinput_value_ReviewReqCopyMat").getText();
		//qm
		var qua_insp_check = oControllerObjReviewReqCopyMat.getView().byId("idcheckboxqualityinspect_value_ReviewReqCopyMat").getSelected();
		if (qua_insp_check == true) {
			qua_insp_check = "X";
		} else {
			qua_insp_check = "";
		}

		var batch_manag_check = oControllerObjReviewReqCopyMat.getView().byId("idcheckboxbatchmanag_value_ReviewReqCopyMat").getSelected();
		if (batch_manag_check == true) {
			batch_manag_check = "X";
		} else {
			batch_manag_check = "";
		}

		var shel_life_check = oControllerObjReviewReqCopyMat.getView().byId("idcheckboxshelfile_value_ReviewReqCopyMat").getSelected();
		if (shel_life_check == true) {
			shel_life_check = "X";
		} else {
			shel_life_check = "";
		}
		//remarks
		var AttachmentFlag = "";
		var ReqComment = oControllerObjReqCopyMat.getView().byId("idReqComment_value_ReqCopyMat").getValue();
		oControllerObjReviewReqCopyMat.getView().byId("idReqComment_value_ReviewReqCopyMat").setText(ReqComment);
		if (oControllerObjReviewReqCopyMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT").getData().results != undefined) {
			AttachmentFlag = "X"
		}
		busyDialog.open();
		$.support.cors = true;
		var oHeaders = {
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-Token": "Fetch",
			"Content-Type": "application/atom+xml",
			"DataServiceVersion": "2.0",
			"Accept": "application/atom+xml"
		};

		var iGETUrl = oControllerObjReviewReqCopyMat.getOwnerComponent().getModel("oDataModelSP").sServiceUrl;
		$.ajax({
			headers: oHeaders,
			url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet",
			type: "GET",
			async: false,
			timeout: 100000,
			error: function (data, oResponse) {
				//      debugger;
				busyDialog.close();
				sap.m.MessageBox
					.error(" Data fetch failed");
			},
			success: function (data, textStatus, jqXHR) {
				debugger;
				var token = jqXHR.getResponseHeader('x-csrf-token');

				var dataFinal = [];
				var dataString = "";

				dataFinal
					.push("<?xml version='1.0' encoding='UTF-8'?>" + "<atom:entry  xmlns:atom='http://www.w3.org/2005/Atom' " +
						"xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' " +
						"xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'>" + "<atom:content type='application/xml'>" +
						"<m:properties>" + "<d:Attachment>" + AttachmentFlag + "</d:Attachment>" + "<d:Dupliacte>" + oControllerObjReqCopyMat.DuplicateFlag +
						"</d:Dupliacte>" + "<d:Matnr>" + oControllerObjReqCopyMat.ValidatedMatnr + "</d:Matnr>" + "<d:Maktx>" + shortText + "</d:Maktx>" +
						"<d:Werks>" +
						plant_value + "</d:Werks>" +
						"<d:PlantName></d:PlantName>" + "<d:Matkl>" + purchase_code_num_value + "</d:Matkl>" + "<d:Meins>" + buom_value + "</d:Meins>" +
						"<d:Lgort></d:Lgort>" +
						"<d:Ernam></d:Ernam>" + "<d:Erdat>2016-04-19T00:00:00</d:Erdat>" + "<d:Contact>" + contact_value + "</d:Contact>" + "<d:ValClass>" +
						consumable_value + "</d:ValClass>" + "<d:StorCb>" + storage_check + "</d:StorCb>" + "<d:ForcstPer>" + forcast_per_period_value +
						"</d:ForcstPer>" + "<d:Period>" + period_value + "</d:Period>" + "<d:ForRemrk>" + remark_forecast_value + "</d:ForRemrk>" +
						"<d:MrpQuan>" + quality_batch_value + "</d:MrpQuan>" + "<d:Repair>" + repair_check + "</d:Repair>" + 
						"<d:EolCb>" + eol_flag_check + "</d:EolCb>" +
						"<d:OemVend>" +
						oem_vendor_value + "</d:OemVend>" +
						"<d:OemPart>" + oem_part_value + "</d:OemPart>" + "<d:OemPart2>" + sec_part_value + "</d:OemPart2>" + "<d:OemVend2>" +
						sec_vendor_value + "</d:OemVend2>" +
						
						"<d:OemVend3>" + third_vendor_value + "</d:OemVend3>" + 
						"<d:OemPart3>" + third_part_value + "</d:OemPart3>" +
						"<d:OemVend4>" + fourth_vendor_value + "</d:OemVend4>" +
						"<d:OemPart4>" + fourth_part_value + "</d:OemPart4>" +
						
						"<d:CritPart>" + critical_value + "</d:CritPart>" + "<d:AutSer>" + aut_serial_num_check +
						"</d:AutSer>" + "<d:Serail>" + serialnoproof_value + "</d:Serail>" + "<d:Serlv>" + serial_level_hand_value + "</d:Serlv>" +
						"<d:Msehi>" + UOI_value + "</d:Msehi>" + "<d:Conv>" + conversion_value + "</d:Conv>" + "<d:Lgtyp>" + add_store_typ_text +
						"</d:Lgtyp>" + "<d:WhRemrk>" +
						remarks_spec_hand_value + "</d:WhRemrk>" + "<d:Prctr>" + profit_cen_value + "</d:Prctr>" + "<d:Kostl>" + cost_centre_value +
						"</d:Kostl>" + "<d:QualInsp>" + qua_insp_check + "</d:QualInsp>" + "<d:BatchMan>" + batch_manag_check + "</d:BatchMan>" +
						"<d:ShelfLife>" + shel_life_check + "</d:ShelfLife>" + "<d:ReqComment>" + ReqComment + "</d:ReqComment>" + "<d:Case>C</d:Case>" +
						"</m:properties>" + "</atom:content>" +
						"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_CLASSIF_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.HEADER2ITEM'>" +
						"<m:inline>" + "<atom:feed>");

				//loop start here
				for (var e = 0; e < oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results.length; e++) {
					dataFinal
						.push("<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" + "<d:Atauth></d:Atauth>" +
							"<d:Klbez></d:Klbez>" + "<d:Clint></d:Clint>" + "<d:Class>" + oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results[e].Class +
							"</d:Class>" + "<d:Atinn></d:Atinn>" + "<d:Atnam>" + oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results[e].Atnam +
							"</d:Atnam>" + "<d:Atwrt>" + oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results[e].Atwrt + "</d:Atwrt>" +
							"<d:Atflv>0</d:Atflv>" + "<d:Klart></d:Klart>" + "<d:Atkle>false</d:Atkle>" + "<d:Atkla>" + oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc
							.results[e].Atkla + "</d:Atkla>" + "<d:Atein>false</d:Atein>" + "<d:Msehi></d:Msehi>" + "<d:Atstd>false</d:Atstd>" + "<d:NewVal>" +
							oControllerObjReqCopyMat.ClassificationTreeJSONFlatStrc.results[e].New + "</d:NewVal>" + "<d:Atbez></d:Atbez>" +
							"</m:properties>" + "</atom:content>" + "</atom:entry>");
				}
				//loop end here

				dataFinal
					.push("</atom:feed>" + "</m:inline>" + "</atom:link>" + "</atom:entry>");

				debugger;
				var FinalData = '';
				var Final = '';
				for (var i = 0; i < dataFinal.length; i++) {
					FinalData = dataFinal.join('');
					// FinalData =
					// FinalData.replace(/\\/g, '')
				}
				var myHeadersend = {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"Accept": "application/json,application/atom+xml,application/xml,application/atomsvc+xml",
					"X-CSRF-Token": token
				};

				var iPOSTUrl = iGETUrl + "/ET_HEADER_DATASet";
				$.ajax({
					headers: myHeadersend,
					url: iPOSTUrl,
					type: "POST",
					data: FinalData,
					// // processData: false,
					async: false,
					error: function (data, oResponse) {
						busyDialog.close();
						sap.m.MessageBox
							.error(" Material Creation failed");
					},
					success: function (data, oResponse) {
						debugger;
						busyDialog.close();
						var Guid = data.d.GuiId;
						var Matnr = data.d.Matnr;
						var oDialogSuccessMatCret = new sap.m.Dialog({
							title: "Message",
							type: "Message",
							content: [new sap.m.Text({
								text: " Material : " + Matnr + " will be created "
								/*text: " Material Creation After Submit only "*/
								
							})],
							endButton: new sap.m.Button({
								text: "Ok",
								press: function () {
									debugger;
									oControllerObjReqCopyMat.getView().byId("idIconTabBarRequestCopyMaterial").destroyItems();
									oControllerObjReviewReqCopyMat.getView().byId("idIconTabBarReviewRequestCopyMaterial").destroyItems();
									oControllerObjReqCopyMat.DuplicateFlag = "";
									oControllerObjReqCopyMat.getView().byId("idShortText_ReqCopyMat").setText("");
									oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setText("Validate Classification Information");
									oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setType("Emphasized");
									oControllerObjReqCopyMat.getView().byId("idReviewBtn_ReqCopyMat").setEnabled(false);
									z_app_spare_parts.z_spare_parts1.util.InputMatInformation.clearInputMatInformationReqCopyMat(oControllerObjReqCopyMat);
									// z_app_spare_parts.z_spare_parts1.util.SubClassContent.clearClassificationTreeReqNewMat(oControllerObjReqCopyMat);
									// z_app_spare_parts.z_spare_parts1.util.SubClassContent.clearClassificationTreeSearch(oControllerObjReviewReqCopyMat);
									oDialogSuccessMatCret.close();
									oDialogSuccessMatCret.destroy();
									oControllerObjReqCopyMat.ClassificationTreeJSON = {
										results: []
									};
									oControllerObjReviewReqCopyMat.ClassificationTreeJSON = {
										results: []
									};
									var oRouter = sap.ui.core.UIComponent.getRouterFor(oControllerObjReviewReqCopyMat);
									oRouter.navTo("search");

								}
							}),
						});
						oDialogSuccessMatCret.open();

						//  sap.m.MessageBox
						// .success(" Material Creation successfull");
						if (oControllerObjReqCopyMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT").getData().results != undefined) {
							var oModel = oControllerObjReqCopyMat.getOwnerComponent().getModel("oDataModelSP");
							//  /sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/ZC_MM_GET_CONFIG(p_appl='SPARE_PART',p_field='WERKS')/Set
							// var that = this;
							var attachModelData = oControllerObjReqCopyMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT").getData().results;
							var Last = "";
							var oneLessAttachModelDatalength = attachModelData.length - 1;
							var index = "";

							if (attachModelData.length == 1) {
								LAST = "X";
								index = 0;
								z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjReqCopyMat, Guid, attachModelData,
									LAST, index);
							} else if (attachModelData.length > 1) {
								for (var y = 0; y < attachModelData.length; y++) {
									if (y < oneLessAttachModelDatalength) {
										LAST = "";
										index = y;
										z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjReqCopyMat, Guid,
											attachModelData, LAST, index);
									} else if (y == oneLessAttachModelDatalength) {
										LAST = "X";
										index = y;
										z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjReqCopyMat, Guid,
											attachModelData, LAST, index);
									}
								}
							}
						}

					}

				});
			}
		});
	};
z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onValidatePlantExtension = function (oControllerObjPlantExtension) {
		busyDialog.open();
		debugger;

		//  z_app_spare_parts.z_spare_parts1.util.MaterialCreation.formJSONFlatClassificationTree(oControllerObjPlantExtension);
		// var shortText = oControllerObjPlantExtension.getView().byId("idShortText_PlantExtension").getText();
		var user_name_value = oControllerObjPlantExtension.getView().byId("idinputusername_value_PlantExtension").getValue(); //get value for input
		var contact_value = oControllerObjPlantExtension.getView().byId("idinputcontact_value_PlantExtension").getValue();
		var eol_flag_check = oControllerObjPlantExtension.getView().byId("idEOLFLAG_value_PlantExtension").getSelected();
		var plant_value = oControllerObjPlantExtension.getView().byId("idplantinput_value_PlantExtension").getValue();
		var purchase_code_num_value = oControllerObjPlantExtension.getView().byId("idinputpcn_value_PlantExtension").getValue();
		var buom_value = oControllerObjPlantExtension.getView().byId("idBaseUOMinput_value_PlantExtension").getValue();
		var consumable_value = oControllerObjPlantExtension.getView().byId("idcomboboxconsumable_value_PlantExtension").getValue();
		//commented by Udit now we need complete value
		/*consumable_value = consumable_value.charAt("0");*/
		//mrp
		var forcast_per_period_value = oControllerObjPlantExtension.getView().byId("idinputforecaseperiod_value_PlantExtension").getValue();
		var quality_batch_value = oControllerObjPlantExtension.getView().byId("idinputquantityperbatch_value_PlantExtension").getValue();
		var cost_centre_value = oControllerObjPlantExtension.getView().byId("idinputcostcenter_value_PlantExtension").getValue();

		var period_value = oControllerObjPlantExtension.getView().byId("idinputperiod_value_PlantExtension").getValue();
		var storage_check = oControllerObjPlantExtension.getView().byId("idcheckboxstoragronly_value_PlantExtension").getSelected();
		if (storage_check == true) {
			storage_check = "X";
		} else {
			storage_check = "";
		}
		var remark_forecast_value = oControllerObjPlantExtension.getView().byId("idinputremarkforcast_value_PlantExtension").getValue();
		var repair_check = oControllerObjPlantExtension.getView().byId("idcheckboxrepair_value_PlantExtension").getSelected();
		if (repair_check == true) {
			repair_check = "X";
		} else {
			repair_check = "";
		}
		//pur
		var oem_vendor_value = oControllerObjPlantExtension.getView().byId("idinputfirstoemvendor_value_PlantExtension").getValue();

		var oem_part_value = oControllerObjPlantExtension.getView().byId("idinputoempartfirst_value_PlantExtension").getValue();

		var sec_vendor_value = oControllerObjPlantExtension.getView().byId("idinputsecondvendor_value_PlantExtension").getValue();

		var sec_part_value = oControllerObjPlantExtension.getView().byId("idinputoempartsecond_value_PlantExtension").getValue();
		
		
		//udit start-----------------------------------------------------
		var third_vendor_value = oControllerObjPlantExtension.getView().byId("idinputthirdoemvendor_value_PlantExtension").getValue();

		var third_part_value = oControllerObjPlantExtension.getView().byId("idinputoempartthird_value_PlantExtension").getValue();

		var fourth_vendor_value = oControllerObjPlantExtension.getView().byId("idinputfourthvendor_value_PlantExtension").getValue();

		var fourth_part_value = oControllerObjPlantExtension.getView().byId("idinputoempartfourth_value_PlantExtension").getValue();
		

		var critical_value = oControllerObjPlantExtension.getView().byId("idinputcriticalpart_value_PlantExtension").getValue();
		//fin
		var profit_cen_value = oControllerObjPlantExtension.getView().byId("idinputprofitcentre_value_PlantExtension").getValue();
		//wh
		var aut_serial_num_check = oControllerObjPlantExtension.getView().byId("idcheckboxautserialno_value_PlantExtension").getSelected();
		if (aut_serial_num_check == true) {
			aut_serial_num_check = "X";
		} else {
			aut_serial_num_check = "";
		}

		var UOI_value = oControllerObjPlantExtension.getView().byId("idinputuoi_value_PlantExtension").getValue();

		// var add_store_typ_value = oControllerObjPlantExtension.getView().byId("addstoreinputid_value_PlantExtension").getValue();
		var add_store_typ_text = "";
		var add_store_typ_value = oControllerObjPlantExtension.getView().byId("addstoreinputid_value_PlantExtension").getTokens();

		if (add_store_typ_value.length > 0) {
			for (var d = 0; d < add_store_typ_value.length; d++) {
				if (d == 0) {
					add_store_typ_text = add_store_typ_value[d].getText();
				} else {
					add_store_typ_text = add_store_typ_text + "," + add_store_typ_value[d].getText();
				}
			}
		}

		var serialnoproof_value = oControllerObjPlantExtension.getView().byId("idinputserialnoprof_value_PlantExtension").getValue();

		var conversion_value = oControllerObjPlantExtension.getView().byId("idinputconversion_value_PlantExtension").getValue();

		var remarks_spec_hand_value = oControllerObjPlantExtension.getView().byId("idinputremarks_value_PlantExtension").getValue();

		var serial_level_hand_value = oControllerObjPlantExtension.getView().byId("idseriallevelinput_value_PlantExtension").getValue();
		//qm
		var qua_insp_check = oControllerObjPlantExtension.getView().byId("idcheckboxqualityinspect_value_PlantExtension").getSelected();
		if (qua_insp_check == true) {
			qua_insp_check = "X";
		} else {
			qua_insp_check = "";
		}

		var batch_manag_check = oControllerObjPlantExtension.getView().byId("idcheckboxbatchmanag_value_PlantExtension").getSelected();
		if (batch_manag_check == true) {
			batch_manag_check = "X";
		} else {
			batch_manag_check = "";
		}

		var shel_life_check = oControllerObjPlantExtension.getView().byId("idcheckboxshelfile_value_PlantExtension").getSelected();
		if (shel_life_check == true) {
			shel_life_check = "X";
		} else {
			shel_life_check = "";
		}
		//remarks
		var ReqComment = oControllerObjPlantExtension.getView().byId("idReqComment_value_PlantExtension").getValue();
		var AttachmentFlag = "";
		if (oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").getData().results != undefined) {
			AttachmentFlag = "X"
		}
		busyDialog.open();
		$.support.cors = true;
		var oHeaders = {
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-Token": "Fetch",
			"Content-Type": "application/atom+xml",
			"DataServiceVersion": "2.0",
			"Accept": "application/atom+xml"
		};

		var iGETUrl = oControllerObjPlantExtension.getOwnerComponent().getModel("oDataModelSP").sServiceUrl;
		$.ajax({
			headers: oHeaders,
			url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet",
			type: "GET",
			async: false,
			timeout: 100000,
			error: function (data, oResponse) {
				//      debugger;
				busyDialog.close();
				sap.m.MessageBox
					.error(" Data fetch failed");
			},
			success: function (data, textStatus, jqXHR) {
				debugger;
				var token = jqXHR.getResponseHeader('x-csrf-token');

				var dataFinal = [];
				var dataString = "";

				dataFinal
					.push("<?xml version='1.0' encoding='UTF-8'?>" + "<atom:entry  xmlns:atom='http://www.w3.org/2005/Atom' " +
						"xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' " +
						"xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'>" + "<atom:content type='application/xml'>" +
						"<m:properties>" + "<d:Attachment>" + AttachmentFlag + "</d:Attachment>" + "<d:Dupliacte></d:Dupliacte><d:Matnr> " +
						oSearchController.Matnr + "</d:Matnr>" +
						"<d:Maktx></d:Maktx>" + "<d:Werks>" + plant_value + "</d:Werks>" +
						"<d:PlantName></d:PlantName>" + "<d:Matkl>" + purchase_code_num_value + "</d:Matkl>" + "<d:Meins>" + buom_value + "</d:Meins>" +
						"<d:Lgort></d:Lgort>" +
						"<d:Ernam></d:Ernam>" + "<d:Erdat>2016-04-19T00:00:00</d:Erdat>" + "<d:Contact>" + contact_value + "</d:Contact>" + "<d:ValClass>" +
						consumable_value + "</d:ValClass>" + "<d:StorCb>" + storage_check + "</d:StorCb>" + "<d:ForcstPer>" + forcast_per_period_value +
						"</d:ForcstPer>" + "<d:Period>" + period_value + "</d:Period>" + "<d:ForRemrk>" + remark_forecast_value + "</d:ForRemrk>" +
						"<d:MrpQuan>" + quality_batch_value + "</d:MrpQuan>" + "<d:Repair>" + repair_check + "</d:Repair>" + 
						"<d:EolCb>" + eol_flag_check + "</d:EolCb>" +
						"<d:OemVend>" +
						oem_vendor_value + "</d:OemVend>" +
						"<d:OemPart>" + oem_part_value + "</d:OemPart>" + "<d:OemPart2>" + sec_part_value + "</d:OemPart2>" + "<d:OemVend2>" +
						sec_vendor_value + "</d:OemVend2>" +
						"<d:OemVend3>" + third_vendor_value + "</d:OemVend3>" + 
						"<d:OemPart3>" + third_part_value + "</d:OemPart3>" +
						"<d:OemVend4>" + fourth_vendor_value + "</d:OemVend4>" +
						"<d:OemPart4>" + fourth_part_value + "</d:OemPart4>" +
						
						
						"<d:CritPart>" + critical_value + "</d:CritPart>" + "<d:AutSer>" + aut_serial_num_check +
						"</d:AutSer>" + "<d:Serail>" + serialnoproof_value + "</d:Serail>" + "<d:Serlv>" + serial_level_hand_value + "</d:Serlv>" +
						"<d:Msehi>" + UOI_value + "</d:Msehi>" + "<d:Conv>" + conversion_value + "</d:Conv>" + "<d:Lgtyp>" + add_store_typ_text +
						"</d:Lgtyp>" + "<d:WhRemrk>" +
						remarks_spec_hand_value + "</d:WhRemrk>" + "<d:Prctr>" + profit_cen_value + "</d:Prctr>" + "<d:Kostl>" + cost_centre_value +
						"</d:Kostl>" + "<d:QualInsp>" + qua_insp_check + "</d:QualInsp>" + "<d:BatchMan>" + batch_manag_check + "</d:BatchMan>" +
						"<d:ShelfLife>" + shel_life_check + "</d:ShelfLife>" + "<d:ReqComment>" + ReqComment + "</d:ReqComment>" + "<d:Case>V</d:Case>" +
						"</m:properties>" + "</atom:content>" +
						"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_CLASSIF_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.HEADER2ITEM'>" +
						"<m:inline>" + "<atom:feed>");

				//loop start here
				dataFinal
					.push("<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" + "<d:Atauth></d:Atauth>" + "<d:Klbez></d:Klbez>" +
						"<d:Clint></d:Clint>" + "<d:Class></d:Class>" + "<d:Atinn></d:Atinn>" + "<d:Atnam></d:Atnam>" + "<d:Atwrt></d:Atwrt>" +
						"<d:Atflv>0</d:Atflv>" + "<d:Klart></d:Klart>" + "<d:Atkle>false</d:Atkle>" + "<d:Atkla></d:Atkla>" + "<d:Atein>false</d:Atein>" +
						"<d:Msehi></d:Msehi>" + "<d:Atstd>false</d:Atstd>" + "<d:NewVal></d:NewVal>" + "<d:Atbez></d:Atbez>" + "</m:properties>" +
						"</atom:content>" + "</atom:entry>");
				// }
				//loop end here

				dataFinal
					.push("</atom:feed>" + "</m:inline>" + "</atom:link>" + "</atom:entry>");

				debugger;
				var FinalData = '';
				var Final = '';
				for (var i = 0; i < dataFinal.length; i++) {
					FinalData = dataFinal.join('');
					// FinalData =
					// FinalData.replace(/\\/g, '')
				}
				var myHeadersend = {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"Accept": "application/json,application/atom+xml,application/xml,application/atomsvc+xml",
					"X-CSRF-Token": token
				};

				var iPOSTUrl = iGETUrl + "/ET_HEADER_DATASet";
				$.ajax({
					headers: myHeadersend,
					url: iPOSTUrl,
					type: "POST",
					data: FinalData,
					// // processData: false,
					async: false,
					error: function (data, oResponse) {
						busyDialog.close();
						sap.m.MessageBox
							.error(" Material Validation failed");
					},
					success: function (data, oResponse) {
						debugger;
						busyDialog.close();
						var Guid = data.d.GuiId;
						var reason;
						var stateDialog;
						var Matnr = data.d.Matnr;
						oControllerObjPlantExtension.ValidatedMatnr = Matnr;
						if (Matnr == "") {
							reason = data.d.ReqComment
							stateDialog = "Error";
						} else {
							/*reason = " Material : " + Matnr + " will be extended "*/
							reason = " Material extension after Submit only "
							stateDialog = "Success";
						}
						var oDialogSuccessMatCret = new sap.m.Dialog({
							title: "Message",
							type: "Message",
							state: stateDialog,
							content: [new sap.m.Text({
								text: reason
							})],
							endButton: new sap.m.Button({
								text: "Ok",
								press: function () {
									debugger;
									if (stateDialog == "Error") {
										oDialogSuccessMatCret.close();
										oDialogSuccessMatCret.destroy();
									} else {
										oDialogSuccessMatCret.close();
										oDialogSuccessMatCret.destroy();
										var oRouter = sap.ui.core.UIComponent.getRouterFor(oControllerObjPlantExtension);
										oRouter.navTo("ReviewPlantExtension");
									}
								}
							}),
						});
						oDialogSuccessMatCret.open();
					}

				});
			}
		});

	},
	z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onSubmitPlantExtension = function (oControllerObjPlantExtension,
		oControllerObjReviewPlantExtension) {
		debugger;
		busyDialog.open();
		// var oDataModelPCN = that.getOwnerComponent().getModel("oDataModelPCN");
		// oModel.read("/ZC_MM_PCN_LIST(p_appl='SPARE_PART')/Set", null, null, true,
		// z_app_spare_parts.z_spare_parts1.util.MaterialCreation.formJSONFlatClassificationTree(oControllerObjReqNewMat);

		var user_name_value = oControllerObjReviewPlantExtension.getView().byId("idinputusername_value_ReviewPlantExtension").getText(); //get value for input
		var contact_value = oControllerObjReviewPlantExtension.getView().byId("idinputcontact_value_ReviewPlantExtension").getText();
		var eol_flag_check = oControllerObjReviewPlantExtension.getView().byId("idEOLFLAG_value_ReviewPlantExtension").getSelected();
		var plant_value = oControllerObjReviewPlantExtension.getView().byId("idplantinput_value_ReviewPlantExtension").getText();
		var purchase_code_num_value = oControllerObjReviewPlantExtension.getView().byId("idinputpcn_value_ReviewPlantExtension").getText();
		var buom_value = oControllerObjReviewPlantExtension.getView().byId("idBaseUOMinput_value_ReviewPlantExtension").getText();
		var consumable_value = oControllerObjReviewPlantExtension.getView().byId("idcomboboxconsumable_value_ReviewPlantExtension").getText();
		//commented by Udit now we need complete value
		/*consumable_value = consumable_value.charAt("0");*/
		//mrp
		var forcast_per_period_value = oControllerObjReviewPlantExtension.getView().byId("idinputforecaseperiod_value_ReviewPlantExtension").getText();
		var quality_batch_value = oControllerObjReviewPlantExtension.getView().byId("idinputquantityperbatch_value_ReviewPlantExtension").getText();
		var cost_centre_value = oControllerObjReviewPlantExtension.getView().byId("idinputcostcenter_value_ReviewPlantExtension").getText();

		var period_value = oControllerObjReviewPlantExtension.getView().byId("idinputperiod_value_ReviewPlantExtension").getText();
		var storage_check = oControllerObjReviewPlantExtension.getView().byId("idcheckboxstoragronly_value_ReviewPlantExtension").getSelected();
		if (storage_check == true) {
			storage_check = "X";
		} else {
			storage_check = "";
		}
		var remark_forecast_value = oControllerObjReviewPlantExtension.getView().byId("idinputremarkforcast_value_ReviewPlantExtension").getText();
		var repair_check = oControllerObjReviewPlantExtension.getView().byId("idcheckboxrepair_value_ReviewPlantExtension").getSelected();
		if (repair_check == true) {
			repair_check = "X";
		} else {
			repair_check = "";
		}
		//pur
		var oem_vendor_value = oControllerObjReviewPlantExtension.getView().byId("idinputfirstoemvendor_value_ReviewPlantExtension").getText();

		var oem_part_value = oControllerObjReviewPlantExtension.getView().byId("idinputoempartfirst_value_ReviewPlantExtension").getText();

		var sec_vendor_value = oControllerObjReviewPlantExtension.getView().byId("idinputsecondvendor_value_ReviewPlantExtension").getText();

		var sec_part_value = oControllerObjReviewPlantExtension.getView().byId("idinputoempartsecond_value_ReviewPlantExtension").getText();
		
		//udit kandh------------------------------------------------------------
		
		var third_vendor_value = oControllerObjReviewPlantExtension.getView().byId("idinputthirdoemvendor_value_ReviewPlantExtension").getText();

		var third_part_value = oControllerObjReviewPlantExtension.getView().byId("idinputoempartthird_value_ReviewPlantExtension").getText();

		var fourth_vendor_value = oControllerObjReviewPlantExtension.getView().byId("idinputfourthvendor_value_ReviewPlantExtension").getText();

		var fourth_part_value = oControllerObjReviewPlantExtension.getView().byId("idinputoempartfourth_value_ReviewPlantExtension").getText();
		

		var critical_value = oControllerObjReviewPlantExtension.getView().byId("idinputcriticalpart_value_ReviewPlantExtension").getText();
		//fin
		var profit_cen_value = oControllerObjReviewPlantExtension.getView().byId("idinputprofitcentre_value_ReviewPlantExtension").getText();
		//wh
		var aut_serial_num_check = oControllerObjReviewPlantExtension.getView().byId("idcheckboxautserialno_value_ReviewPlantExtension").getSelected();
		if (aut_serial_num_check == true) {
			aut_serial_num_check = "X";
		} else {
			aut_serial_num_check = "";
		}

		var UOI_value = oControllerObjReviewPlantExtension.getView().byId("idinputuoi_value_ReviewPlantExtension").getText();
		var add_store_typ_text = "";
		var add_store_typ_value = oControllerObjReviewPlantExtension.getView().byId("addstoreinputid_value_ReviewPlantExtension").getTokens();

		if (add_store_typ_value.length > 0) {
			for (var d = 0; d < add_store_typ_value.length; d++) {
				if (d == 0) {
					add_store_typ_text = add_store_typ_value[d].getText();
				} else {
					add_store_typ_text = add_store_typ_text + "," + add_store_typ_value[d].getText();
				}
			}
		}

		var serialnoproof_value = oControllerObjReviewPlantExtension.getView().byId("idinputserialnoprof_value_ReviewPlantExtension").getText();

		var conversion_value = oControllerObjReviewPlantExtension.getView().byId("idinputconversion_value_ReviewPlantExtension").getText();

		var remarks_spec_hand_value = oControllerObjReviewPlantExtension.getView().byId("idinputremarks_value_ReviewPlantExtension").getText();

		var serial_level_hand_value = oControllerObjReviewPlantExtension.getView().byId("idseriallevelinput_value_ReviewPlantExtension").getText();
		//qm
		var qua_insp_check = oControllerObjReviewPlantExtension.getView().byId("idcheckboxqualityinspect_value_ReviewPlantExtension").getSelected();
		if (qua_insp_check == true) {
			qua_insp_check = "X";
		} else {
			qua_insp_check = "";
		}

		var batch_manag_check = oControllerObjReviewPlantExtension.getView().byId("idcheckboxbatchmanag_value_ReviewPlantExtension").getSelected();
		if (batch_manag_check == true) {
			batch_manag_check = "X";
		} else {
			batch_manag_check = "";
		}

		var shel_life_check = oControllerObjReviewPlantExtension.getView().byId("idcheckboxshelfile_value_ReviewPlantExtension").getSelected();
		if (shel_life_check == true) {
			shel_life_check = "X";
		} else {
			shel_life_check = "";
		}
		var AttachmentFlag = "";
		//remarks
		var ReqComment = oControllerObjPlantExtension.getView().byId("idReqComment_value_PlantExtension").getValue();
		oControllerObjReviewPlantExtension.getView().byId("idReqComment_value_ReviewPlantExtension").setText(ReqComment);

		busyDialog.open();
		$.support.cors = true;
		var oHeaders = {
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-Token": "Fetch",
			"Content-Type": "application/atom+xml",
			"DataServiceVersion": "2.0",
			"Accept": "application/atom+xml"
		};

		var iGETUrl = oControllerObjReviewPlantExtension.getOwnerComponent().getModel("oDataModelSP").sServiceUrl;
		$.ajax({
			headers: oHeaders,
			url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet",
			type: "GET",
			async: false,
			timeout: 100000,
			error: function (data, oResponse) {
				//      debugger;
				busyDialog.close();
				sap.m.MessageBox
					.error(" Data fetch failed");
			},
			success: function (data, textStatus, jqXHR) {
				debugger;
				var token = jqXHR.getResponseHeader('x-csrf-token');
				if (oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT").getData().results != undefined) {
					AttachmentFlag = "X"
				}
				var dataFinal = [];
				var dataString = "";

				dataFinal
					.push("<?xml version='1.0' encoding='UTF-8'?>" + "<atom:entry  xmlns:atom='http://www.w3.org/2005/Atom' " +
						"xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' " +
						"xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'>" + "<atom:content type='application/xml'>" +
						"<m:properties>" + "<d:Attachment>" + AttachmentFlag + "</d:Attachment>" + "<d:Dupliacte></d:Dupliacte>" + "<d:Matnr>" +
						oControllerObjPlantExtension.ValidatedMatnr + "</d:Matnr>" +
						"<d:Maktx></d:Maktx>" + "<d:Werks>" + plant_value + "</d:Werks>" + "<d:PlantName></d:PlantName>" + "<d:Matkl>" +
						purchase_code_num_value + "</d:Matkl>" +
						"<d:Meins>" + buom_value + "</d:Meins>" + "<d:Lgort></d:Lgort>" + "<d:Ernam></d:Ernam>" + "<d:Erdat>2016-04-19T00:00:00</d:Erdat>" +
						"<d:Contact>" + contact_value + "</d:Contact>" + "<d:ValClass>" + consumable_value + "</d:ValClass>" + "<d:StorCb>" +
						storage_check + "</d:StorCb>" + "<d:ForcstPer>" + forcast_per_period_value + "</d:ForcstPer>" + "<d:Period>" + period_value +
						"</d:Period>" + "<d:ForRemrk>" + remark_forecast_value + "</d:ForRemrk>" + "<d:MrpQuan>" + quality_batch_value + "</d:MrpQuan>" +
						"<d:Repair>" +
						repair_check + "</d:Repair>" +
						"<d:EolCb>" + eol_flag_check + "</d:EolCb>" +
						"<d:OemVend>" + oem_vendor_value + "</d:OemVend>" + "<d:OemPart>" + oem_part_value + "</d:OemPart>" +
						"<d:OemPart2>" + sec_part_value + "</d:OemPart2>" + "<d:OemVend2>" + sec_vendor_value + "</d:OemVend2>" +
						"<d:OemVend3>" + third_vendor_value + "</d:OemVend3>" + 
						"<d:OemPart3>" + third_part_value + "</d:OemPart3>" +
						"<d:OemVend4>" + fourth_vendor_value + "</d:OemVend4>" +
						"<d:OemPart4>" + fourth_part_value + "</d:OemPart4>" +
						
						
						"<d:CritPart>" +
						critical_value + "</d:CritPart>" + "<d:AutSer>" + aut_serial_num_check + "</d:AutSer>" + "<d:Serail>" + serialnoproof_value +
						"</d:Serail>" + "<d:Serlv>" + serial_level_hand_value + "</d:Serlv>" + "<d:Msehi>" + UOI_value + "</d:Msehi>" + "<d:Conv>" +
						conversion_value + "</d:Conv>" + "<d:Lgtyp>" + add_store_typ_text + "</d:Lgtyp>" + "<d:WhRemrk>" + remarks_spec_hand_value +
						"</d:WhRemrk>" + "<d:Prctr>" +
						profit_cen_value + "</d:Prctr>" + "<d:Kostl>" + cost_centre_value + "</d:Kostl>" + "<d:QualInsp>" + qua_insp_check +
						"</d:QualInsp>" + "<d:BatchMan>" + batch_manag_check + "</d:BatchMan>" + "<d:ShelfLife>" + shel_life_check + "</d:ShelfLife>" +
						"<d:ReqComment>" + ReqComment + "</d:ReqComment>" + "<d:Case>E</d:Case>" + "</m:properties>" + "</atom:content>" +
						"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_CLASSIF_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.HEADER2ITEM'>" +
						"<m:inline>" + "<atom:feed>");

				//loop start here
				// for (var e = 0; e < oControllerObjReqNewMat.ClassificationTreeJSONFlatStrc.results.length; e++) {
				dataFinal
					.push("<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" + "<d:Atauth></d:Atauth>" + "<d:Klbez></d:Klbez>" +
						"<d:Clint></d:Clint>" + "<d:Class></d:Class>" + "<d:Atinn></d:Atinn>" + "<d:Atnam></d:Atnam>" + "<d:Atwrt></d:Atwrt>" +
						"<d:Atflv>0</d:Atflv>" + "<d:Klart></d:Klart>" + "<d:Atkle>false</d:Atkle>" + "<d:Atkla></d:Atkla>" + "<d:Atein>false</d:Atein>" +
						"<d:Msehi></d:Msehi>" + "<d:Atstd>false</d:Atstd>" + "<d:NewVal></d:NewVal>" + "<d:Atbez></d:Atbez>" + "</m:properties>" +
						"</atom:content>" + "</atom:entry>");
				// }
				//loop end here

				dataFinal
					.push("</atom:feed>" + "</m:inline>" + "</atom:link>" + "</atom:entry>");

				debugger;
				var FinalData = '';
				var Final = '';
				for (var i = 0; i < dataFinal.length; i++) {
					FinalData = dataFinal.join('');
					// FinalData =
					// FinalData.replace(/\\/g, '')
				}
				var myHeadersend = {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"Accept": "application/json,application/atom+xml,application/xml,application/atomsvc+xml",
					"X-CSRF-Token": token
				};

				var iPOSTUrl = iGETUrl + "/ET_HEADER_DATASet";
				$.ajax({
					headers: myHeadersend,
					url: iPOSTUrl,
					type: "POST",
					data: FinalData,
					// // processData: false,
					async: false,
					error: function (data, oResponse) {
						busyDialog.close();
						sap.m.MessageBox
							.error(" Plant Extension failed");
					},
					success: function (data, oResponse) {
						debugger;
						busyDialog.close();
						var Guid = data.d.GuiId;
						var Matnr = data.d.Matnr;
						var oDialogSuccessMatCret = new sap.m.Dialog({
							title: "Message",
							type: "Message",
							content: [new sap.m.Text({
								text: " Material : " + Matnr + " will be extended "
								/*text: " Material extension after Submit only "*/
							})],
							endButton: new sap.m.Button({
								text: "Ok",
								press: function () {
									debugger;
									z_app_spare_parts.z_spare_parts1.util.InputMatInformation.clearInputMatInformationPlantExtension(
										oControllerObjPlantExtension);
									oDialogSuccessMatCret.close();
									oDialogSuccessMatCret.destroy();
									oControllerObjPlantExtension.PlantExtensiononBack = false;
									var oRouter = sap.ui.core.UIComponent.getRouterFor(oControllerObjReviewPlantExtension);
									oRouter.navTo("search");

								}
							}),
						});
						oDialogSuccessMatCret.open();

						if (oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT").getData().results != undefined) {
							var attachModelData = oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT").getData().results;
							var Last = "";
							var index = "";
							var oneLessAttachModelDatalength = attachModelData.length - 1;

							if (attachModelData.length == 1) {
								LAST = "X";
								index = 0;
								z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjPlantExtension, Guid, attachModelData,
									LAST, index);
							} else if (attachModelData.length > 1) {
								for (var y = 0; y < attachModelData.length; y++) {
									if (y < oneLessAttachModelDatalength) {
										LAST = "";
										index = y;
										z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjPlantExtension, Guid,
											attachModelData, LAST, index);
									} else if (y == oneLessAttachModelDatalength) {
										LAST = "X";
										index = y;
										z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload(oControllerObjPlantExtension, Guid,
											attachModelData, LAST, index);
									}
								}
							}
						}

					}

				});
			}
		});
	};
z_app_spare_parts.z_spare_parts1.util.MaterialCreation.onAttachmentUpload = function (that, Guid, attachModelData, LAST, y) {
	debugger;
	var oDataModel = that.getOwnerComponent().getModel("oDataModelSP");

	// AttachmentModel = sap.ui.getCore().getModel("EXTEND_PLANT_ATTACHMENT_MODEL");
	// if (attachModelData != undefined) {
	// for (i = 0; i < attachModelData.length; i++) {
	// file = attachModelData[y].file;
	fileName = attachModelData[y].fileName;
	filetype = attachModelData[y].filetype;
	fileUrl = attachModelData[y].fileUrl;
	fileString = attachModelData[y].fileContent;
	slug = attachModelData[y].fileName;
	$.ajaxSetup({
		cache: false
	});
	//      Get CSRF token using AJAX..i have just hard coded for easy understanding...
	var token = "";
	var oHeaders = {
		"X-Requested-With": "XMLHttpRequest",
		"X-CSRF-Token": "Fetch",
		"Content-Type": "application/atom+xml",
		"DataServiceVersion": "2.0",
		"Accept": "application/atom+xml,application/atomsvc+xml"
	};

	$.ajax({
		headers: oHeaders,
		url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet", //serviceURL,
		type: "GET",
		async: false,
		timeout: 100000,
		error: function (data, oResponse) {
			//      debugger;
			busyDialog.close();
			sap.m.MessageBox
				.error(" Data fetch failed");
		},
		success: function (data, textStatus, jqXHR) {
			debugger;
			token = jqXHR.getResponseHeader('x-csrf-token');

			var AttachPOSTURL = oDataModel.sServiceUrl + "/ET_ATTACHMENTSet(GUI_ID='" + Guid + "',FILE_TYPE='" + attachModelData[y].filetype +
				"',TITLE='" +
				attachModelData[y].fileName + "',LAST='" + LAST + "')/UploadNav";

			var myHeadersend = {
				"X-Requested-With": "XMLHttpRequest",
				"Content-type": filetype,
				"DataServiceVersion": "2.0",
				"Accept": "application/json,application/atom+xml,application/xml,application/atomsvc+xml",
				"slug": slug,
				"X-CSRF-Token": token
			};
			$.ajax({
				url: AttachPOSTURL,
				type: "POST",
				// contentType: "application/json",
				processData: false,
				async: false,
				timeout: 100000,
				data: fileString,
				// dataType: "text",
				headers: myHeadersend,
				// headers: {
				//  "x-csrf-token": token,
				//  "Authorization": "Basic cnRoYW5DDDDD",
				//  "slug": slug
				// },
				error: function (jqXHR, textStatus, errorThrown) {
					debugger;
					that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT").setData("");
					that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").setData("");
					that.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT").setData("");
					sap.m.MessageToast.show("Attachment Upload failed");
				},

				success: function (data, textStatus, jqXHR) {
					debugger;
					that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT").setData("");
					that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").setData("");
					that.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT").setData("");
					sap.m.MessageToast.show("Attachment Upload Successfull");
				}
			})
		}
	});
	// }
	// }

	// var oModel = that.getOwnerComponent().getModel("oDataModelSP");
	// oModel.create("/ET_ATTACHMENTSet(GUI_ID='" + Guid + "',FILE_TYPE='" + attachModelData[y].filetype + "',TITLE='" +
	//  attachModelData[y].fileName + "',LAST='" + LAST + "')/UploadNav", null, null, true,
	//  function (oData1, oResponse) {
	//    debugger;
	//    sap.m.MessageToast.show("Attachment Upload Successfull");
	//  },
	//  function (oError) {
	//    debugger;
	//    sap.m.MessageToast.show("Attachment Upload failed");
	//  });
};