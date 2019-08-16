jQuery.sap.declare("z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree");
// jQuery.sap.declare("parts_tracking_system.utils.SuccessHandling");
z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree = {};
var busyDialog = new sap.m.BusyDialog();
z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.formJSONFlatClassificationTree = function (that) {
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
	/*	var oViewID = that.getView().sId;
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
			Atfor:""
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
				Atfor =  classTreeJSON[c].ET_CLASS_CHARNav.results[d].DATATYP;

				that.ClassificationTreeJSONFlatStrc.results.push({
					Class: Class,
					Atnam: CharName,
					Atwrt: CharVal,
					Atkla: Atkla,
					New: New,
					Mandatory: Mandatory,
					ShortTextRel: ShortTextRel,
					Leaf: Leaf,
					Atfor:Atfor
				});
			}

		}
	},
	z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.ValidateClassificationTreeInfo = function (oEvent, that) {
		debugger;
		z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.formJSONFlatClassificationTree(that);
		var ClassTreeFlat = that.ClassificationTreeJSONFlatStrc.results;
		z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
		var lengthClassTreeFlat = ClassTreeFlat.length;
		lengthClassTreeFlat = lengthClassTreeFlat - 1;
		if (ClassTreeFlat[lengthClassTreeFlat].Leaf == "X") {
			z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.validateMandatoryClassificationTree(that, ValidateClassFlag);
			if (z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag() == true) {
				busyDialog.open();
				$.support.cors = true;
				var oHeaders = {
					"X-Requested-With": "XMLHttpRequest",
					"X-CSRF-Token": "Fetch",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"Accept": "application/atom+xml"
				};

				var iGETUrl = that.getOwnerComponent().getModel("oDataModelSP").sServiceUrl;
				$.ajax({
					headers: oHeaders,
					url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet",
					type: "GET",
					async: false,
					timeout: 100000,
					error: function (data, oResponse) {
						//			debugger;
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
								"<m:properties>" + "<d:Message>Search</d:Message>" + "<d:Type>U</d:Type>" + "</m:properties>" + "</atom:content>");

						dataFinal
							.push(
								"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_HEADER_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.classification2return'>" +
								"<m:inline>" + "<atom:feed>" + "<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" +
								"<d:Plant>WA00</d:Plant>" + "</m:properties>" + "</atom:content>" +
								"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_CLASSIF_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.CLASSIFICATION'>" +
								"<m:inline>" + "<atom:feed>");

						//loop start here
						for (var e = 0; e < that.ClassificationTreeJSONFlatStrc.results.length; e++) {
							dataFinal
								.push("<atom:entry>" + "<atom:content type='application/xml'> <m:properties>" + "<d:Class>" + that.ClassificationTreeJSONFlatStrc
									.results[e].Class + "</d:Class>" + "<d:Atnam>" + that.ClassificationTreeJSONFlatStrc.results[e].Atnam + "</d:Atnam>" +
									"<d:Atwrt>" + that.ClassificationTreeJSONFlatStrc.results[e].Atwrt + "</d:Atwrt>" + "<d:Atkla>" + that.ClassificationTreeJSONFlatStrc
									.results[e].Atkla + "</d:Atkla>" +
									"</m:properties>" + "</atom:content>" + "</atom:entry>");
						}
						//loop end here

						dataFinal
							.push("</atom:feed>" + "</m:inline>" + "</atom:link>" + "</atom:entry>" + "</atom:feed>" + "</m:inline>" + "</atom:link>" +
								"</atom:entry>");

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

						var iPOSTUrl = iGETUrl + "/ET_RETURNSet";
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
									.error(" Data fetch failed");
							},
							success: function (data, oResponse) {
								debugger;
								var ReviewBtn;
								var ValidateBtn;
								var validatedShort_Text;
								var ReqCommentText="";
								var oViewID = that.getView().sId;
								if (oViewID.search("newmaterial") > -1) {
									ReviewBtn = that.getView().byId("idReviewBtn_ReqnewMat");
									ValidateBtn = that.getView().byId("idValidateClassBtn_ReqNewMat");
									validatedShort_Text = that.getView().byId("idShortText_ReqNewMat");
									ReqCommentText = that.getView().byId("idReqComment_value_ReqNewMat")
								} else if (oViewID.search("requestCopyMaterial") > -1) {
									ReviewBtn = that.getView().byId("idReviewBtn_ReqCopyMat");
									ValidateBtn = that.getView().byId("idValidateClassBtn_ReqCopyMat");
									validatedShort_Text = that.getView().byId("idShortText_ReqCopyMat");
									ReqCommentText = that.getView().byId("idReqComment_value_ReqCopyMat")
								}
								
								var MessageText1 = "The Material Short Text Field limit is 40 Characters."
								var MessageText2 = data.d.Message;
								var MessageText3 = "Text after 40 Characters will be dismissed. Do you want to Continue?"

								if (data.d.Type == "W") {
									that.matShortText = data.d.MessageV1;
									oDialogValidateClassificationTree = new sap.m.Dialog({
										title: "Message",
										type: "Message",
										// contentWidth:"auto",
										content: [
											new sap.m.Text({
												text: MessageText1,
											}),
											new sap.m.Text({
												text: MessageText2,
											}),
											new sap.m.Text({
												text: MessageText3,
											}),
										],
										beginButton: new sap.m.Button({
											text: "Yes",
											press: function () {
												ReviewBtn.setEnabled(true);
												ValidateBtn.setText("Short Text Verified = ");
												ValidateBtn.setType("Accept");
												validatedShort_Text.setText(data.d.MessageV1);
												oDialogValidateClassificationTree.close();
												oDialogValidateClassificationTree.destroy();
												// that.getView().byId("idReviewBtn_ReqnewMat").setEnabled(true);

											}
										}),
										endButton: new sap.m.Button({
											text: "No",
											press: function () {
												// that.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
												oDialogValidateClassificationTree.close();
												oDialogValidateClassificationTree.destroy();

											}
										}),
									});
									oDialogValidateClassificationTree.open();

								} else if (data.d.Type == "E") {
									that.matShortText = data.d.MessageV1;
									var oDialogError = new sap.m.Dialog({
										title: "Message",
										type: "Message",
										content: [
											new sap.m.VBox({
												items: [
													new sap.m.Text({
														text: MessageText2,
													}),
													new sap.m.Text({
														text: "Please specify the reason for Duplicate Material",
													}),
													new sap.m.TextArea({
														value: "",
														rows: 2,
														width:"100%"
														// cols: 20
													})
												]
											})

										],
										beginButton:new sap.m.Button({
											text: "Ok",
											press: function (oEvent) {
												debugger;
												var ReqComment = oDialogError.getContent()[0].getItems()[2].getValue();
												if (ReqComment != "") {
													ReqCommentText.setValue(ReqComment);
													that.DuplicateFlag = "X";
													ReviewBtn.setEnabled(true);
													ValidateBtn.setText("Short Text Verified = ");
													validatedShort_Text.setText(data.d.MessageV1);
													ValidateBtn.setType("Accept");
													oDialogError.close();
													oDialogError.destroy();
												} else {
													sap.m.MessageBox
														.warning(" Please specify the reason for Duplicate Material ");
												}

											}
										}),
										endButton: new sap.m.Button({
											text: "Cancel",
											press: function (oEvent) {
												debugger;
													oDialogError.close();
													oDialogError.destroy();

											}
										}),
									});
									oDialogError.open();

								} else if (data.d.Type == "S") {
									ReviewBtn.setEnabled(true);
									// sap.m.MessageBox
									// 	.success(" Data validation successfull");
									ValidateBtn.setText("Short Text Verified = ");
									ValidateBtn.setType("Accept");
									validatedShort_Text.setText(data.d.MessageV1);
								}

								busyDialog.close();

							}

						});

					}
				});
			} else {
				sap.m.MessageBox
					.error(" Please fill the Mandatory Details ");
			}

		} else {
			sap.m.MessageBox
				.error(" Please fill the SubClass Details till the Leaf Node");
		}
	};

z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.validateMandatoryClassificationTree = function (that, ValidateClassFlag) {
	debugger;
	var oViewID = that.getView().sId;
	var iconTabBar;
	if (oViewID.search("newmaterial") > -1) {
		iconTabBar = that.byId("idIconTabBarRequestNewMaterial");
		var classTreeJSON = that.ClassificationTreeJSON.results;
		for (var t = 0; t < classTreeJSON.length; t++) {
			for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
				// if (z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag() == false) {
				if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
					if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE == "") {
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
						iconTabBar.getItems()[t].setIconColor("Negative");
						z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(false);
					}
					// break;
					else {
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
						iconTabBar.getItems()[t].setIconColor("Neutral");
						// z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
					}
				}

				// } else {
				// 	z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
				// }

			}
		}
	} else if (oViewID.search("requestCopyMaterial") > -1) {
		iconTabBar = that.byId("idIconTabBarRequestCopyMaterial");
		var classTreeJSON = that.ClassificationTreeJSON.results;
		for (var t = 0; t < classTreeJSON.length; t++) {
			for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
				// if (z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag() == false) {
	//new
	
				// if (z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag() == false) {
				if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
					if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE == "") {
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
						iconTabBar.getItems()[t].setIconColor("Negative");
						z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(false);
					}
					// break;
					else {
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
						iconTabBar.getItems()[t].setIconColor("Neutral");
						// z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
					}
				}

				// } else {
				// 	z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
				// }

			
	//new
	
		//old
			// 	if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X" && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE == "") {
			// 		iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
			// 		iconTabBar.getItems()[t].setIconColor("Negative");
			// 		z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(false);
			// 		break;
			// 	} else {
			// 		iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
			// 		iconTabBar.getItems()[t].setIconColor("Neutral");
			// //		z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
			// 	}
			//old
				// 	break;
				// }

				// } else {
				// 	z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
				// }

			}
			// break;
		}
	}

};
z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.setValidateFlag = function (ValidateFlag) {
	that.ValidateFlag = ValidateFlag;
};
z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag = function (ValidateClassFlag) {
	return that.ValidateFlag;
};

var oDialogValidateClassificationTree;