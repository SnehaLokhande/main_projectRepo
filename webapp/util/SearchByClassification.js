jQuery.sap.declare("z_app_spare_parts.z_spare_parts1.util.SearchByClassification");
// jQuery.sap.declare("parts_tracking_system.utils.SuccessHandling");
z_app_spare_parts.z_spare_parts1.util.SearchByClassification = {};
var busyDialog = new sap.m.BusyDialog();
var ValidateClassFlag;
z_app_spare_parts.z_spare_parts1.util.SearchByClassification.formJSONFlatClassificationTree = function (that) {
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
		that.ClassificationTreeJSONFlatStrc = {
			results: []
		};
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
	z_app_spare_parts.z_spare_parts1.util.SearchByClassification.searchByClassificationTree = function (oEvent, that) {
		debugger;

		// var oDataModelPCN = that.getOwnerComponent().getModel("oDataModelPCN");
		// oModel.read("/ZC_MM_PCN_LIST(p_appl='SPARE_PART')/Set", null, null, true,
		if (!that.ClassificationTreeJSON) {
			sap.m.MessageBox
				.error(" Please fill the SubClass Details till the Leaf Node");
		} else {
			z_app_spare_parts.z_spare_parts1.util.SearchByClassification.formJSONFlatClassificationTree(that);
			var ClassTreeFlat = that.ClassificationTreeJSONFlatStrc.results;
			var lengthClassTreeFlat = ClassTreeFlat.length;
			lengthClassTreeFlat = lengthClassTreeFlat - 1;
			z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
			// ValidateClassFlag = true;
			if (ClassTreeFlat[lengthClassTreeFlat].Leaf == "X") {
				// z_app_spare_parts.z_spare_parts1.util.SearchByClassification.validateMandatoryClassificationTree(that, ValidateClassFlag);
				// if (z_app_spare_parts.z_spare_parts1.util.SearchByClassification.getValidateFlag() == true) {
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
									"<m:properties>" + "<d:Message>Search</d:Message>" + "<d:Type>S</d:Type>" + "</m:properties>" + "</atom:content>");
							dataFinal
								.push(
									"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_MM_SEARCH_MAT_LABELNav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.RETURN2LABEL'>" +
									"<m:inline>" + "<atom:feed>" + "<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" +
									" <d:Value>Test</d:Value>" + "</m:properties>" + "</atom:content>" + "</atom:entry>" + "</atom:feed>" + "</m:inline>" +
									"</atom:link>");

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
									// that.getOwnerComponent().getModel("tableModelSearchByClassTree").setData(data.d.ET_HEADER_DATANav);
									// that.getOwnerComponent().getModel("tableModelSearchByClassTreeLabel").setData(data.d.ET_MM_SEARCH_MAT_LABELNav);
									if (data.d.Type == "S") {
										if (data.d.ET_MM_SEARCH_MAT_LABELNav.results.length > 0 && data.d.ET_MM_SEARCH_MAT_LABELNav.results.length > 0) {
											var oColumnData = data.d.ET_MM_SEARCH_MAT_LABELNav;
											var oColumnDataSet = [];
											oColumnDataSet.push({
												"columnName": oColumnData.results[0].Material,
												"key": "Material",
											});
											oColumnDataSet.push({
												"columnName": oColumnData.results[0].Value,
												"key": "Value",
											});
											oColumnDataSet.push({
												"columnName": oColumnData.results[0].Description,
												"key": "Description",
											});
											oColumnDataSet.push({
												"columnName": oColumnData.results[0].Plant,
												"key": "Plant",
											});
											oColumnDataSet.push({
												"columnName": oColumnData.results[0].Class,
												"key": "Class",
											});

											oColumnDataSet.push({
												"columnName": oColumnData.results[0].Equip,
												"key": "Equip",
											});

											oColumnDataSet.push({
												"columnName": oColumnData.results[0].Pcn,
												"key": "Pcn",
											});

											oColumnDataSet.push({
												"columnName": oColumnData.results[0].DelFlag,
												"key": "DelFlag",
											});

											oColumnDataSet.push({
												"columnName": oColumnData.results[0].PDelFlag,
												"key": "PDelFlag",
											});

											if (oColumnData.results[0].Val1 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val1,
													"key": "Val1",
												});
											}
											if (oColumnData.results[0].Val2 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val2,
													"key": "Val2",
												});
											}
											if (oColumnData.results[0].Val3 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val3,
													"key": "Val3",
												});
											}
											if (oColumnData.results[0].Val4 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val4,
													"key": "Val4",
												});
											}
											if (oColumnData.results[0].Val5 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val5,
													"key": "Val5",
												});
											}
											if (oColumnData.results[0].Val6 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val6,
													"key": "Val6",
												});
											}
											if (oColumnData.results[0].Val7 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val7,
													"key": "Val7",
												});
											}
											if (oColumnData.results[0].Val8 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val8,
													"key": "Val8",
												});
											}
											if (oColumnData.results[0].Val9 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val9,
													"key": "Val9",
													"visible": "true"
												});
											}
											if (oColumnData.results[0].Val10 != "") {
												oColumnDataSet.push({
													"columnName": oColumnData.results[0].Val10,
													"key": "Val10",
												});
											}

											var RowsDataSet = [];
											// RowsDataSet.push(data.d.ET_HEADER_DATANav.results);
											for (var w = 0; w < data.d.ET_HEADER_DATANav.results.length; w++) {
												RowsDataSet.push(data.d.ET_HEADER_DATANav.results[w])
											}
											var tableModelSearchByClassTree = that.getOwnerComponent().getModel("tableModelSearchByClassTree");
											tableModelSearchByClassTree.setData({
												rows: RowsDataSet,
												columns: oColumnDataSet
											});
											var oTable = that.getView().byId("LineItemsSmartTableSearchByClassTree");
											oTable.setModel(tableModelSearchByClassTree);

											oTable.bindColumns("/columns", function (sId, oContext) {
												debugger;
												var columnName = oContext.getObject().columnName;
												var key = oContext.getObject().key;
												return new sap.ui.table.Column({
													label: columnName,
													template: key
												});
											});

											oTable.bindRows("/rows");
										}
										sap.m.MessageBox
											.success(" Data fetch Successfull ");
									} else if (data.d.Type == "E") {
										var oDialogSuccessNoData = new sap.m.Dialog({
											title: "Message",
											type: "Message",
											content: [new sap.m.Text({
												text: " No Data Found, you are being taken to New Material Screen  "
											})],
											beginButton: new sap.m.Button({
												text: "Ok",
												press: function () {
													debugger;
													oDialogSuccessNoData.close();
													oDialogSuccessNoData.destroy();
													oSearchController.ReqNewMatBtnClickFlag = false;
													var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
													oRouter.navTo("NewMaterial");
												}
											}),
											endButton: new sap.m.Button({
												text: "Cancel",
												press: function () {
													debugger;
													oDialogSuccessNoData.close();
													oDialogSuccessNoData.destroy();
												}
											}),
										});
										oDialogSuccessNoData.open();
										// that.ClassificationTreeJSON.results;
									}
									busyDialog.close();

								}

							});

						}
					});
				// } else {
				// 	sap.m.MessageBox
				// 		.error(" Please fill Mandatory SubClass Details");
				// }

			} else {
				sap.m.MessageBox
					.error(" Please fill the SubClass Details till the Leaf Node");
			}
		}
	};
z_app_spare_parts.z_spare_parts1.util.SearchByClassification.validateMandatoryClassificationTree = function (that, ValidateClassFlag) {
	debugger;
	var classTreeJSON = that.ClassificationTreeJSON.results;
	for (var t = 0; t < classTreeJSON.length; t++) {
		for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
			// if (z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag() == false) {
			if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
				if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE == "") {
					that.byId("idIconTabBarClassificationTree").getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
					that.byId("idIconTabBarClassificationTree").getItems()[t].setIconColor("Negative");
					z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(false);
				}
				// break;
				else {
					that.byId("idIconTabBarClassificationTree").getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
					that.byId("idIconTabBarClassificationTree").getItems()[t].setIconColor("Neutral");
					// z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
				}
			}
		}
	}
	// for (var t = 1; t < classTreeJSON.length; t++) {
	// 	for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
	// 		if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X" && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE == "") {
	// 			// var	IconTabKey = parseInt(t) - 1;
	// 			that.byId("idIconTabBarClassificationTree").getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
	// 			that.byId("idIconTabBarClassificationTree").getItems()[t].setIconColor("Negative");
	// 			z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(false);

	// 			break;
	// 		} else {
	// 			that.byId("idIconTabBarClassificationTree").getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
	// 			that.byId("idIconTabBarClassificationTree").getItems()[t].setIconColor("Neutral");
	// 			z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
	// 		}
	// 	}
	// }
};
z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag = function (ValidateFlag) {
	that.ValidateFlag = ValidateFlag;
};
z_app_spare_parts.z_spare_parts1.util.SearchByClassification.getValidateFlag = function (ValidateClassFlag) {
	return that.ValidateFlag;
};