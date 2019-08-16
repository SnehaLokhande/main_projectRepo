jQuery.sap.declare("z_app_spare_parts.z_spare_parts1.util.SubClassContent");
// jQuery.sap.require("z_app_spare_parts.z_spare_parts1.util.InputMatInformation");
// jQuery.sap.declare("parts_tracking_system.utils.SuccessHandling");
z_app_spare_parts.z_spare_parts1.util.SubClassContent = {};
var busyDialog = new sap.m.BusyDialog();
z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadHeaderClass = function (that) {
		debugger;
		//service consumption for Cluster dialog
		var oDataModel = that.getOwnerComponent().getModel("oDataModelSP");
		oDataModel.read("/ET_CLASS_HEADERSet", null, null, true,
			function (oData1, oResponse) {
				debugger;
				HeaderClass = oData1.results[0].MainClass;
				// BusyDialog.close();
				busyDialog.close();
			},
			function (oError) {
				debugger;
				busyDialog.close();
				sap.m.MessageBox
					.error(" Data fetch failed");
			});

		//end service consumption
	},
	z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTree = function (oSubClass, that) {
		debugger;
		//busyDialog.open();
		var oDataModel = that.getOwnerComponent().getModel("oDataModelSP");
		oDataModel.read("/ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + oSubClass +
			"' and PCN eq '" + window.selectedpcn + "'", null, null, true,
			function (oData, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("oClassJsonModel").setData(oData); //temp json
				that.getOwnerComponent().getModel("CharValueJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
				that.getOwnerComponent().getModel("SubClassJsonModel").setData(oData.results[0].ET_SUB_CLASSNav); //json for sub class
				that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
				that.ClassificationTreeJSON.results.push(oData.results[0]);
				//	busyDialog.close();
			},
			function (oError) {
				debugger;
				//	busyDialog.close();
				sap.m.MessageBox705
					.error(" Data fetch failed");
			});
	},
	z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadReqNewMatJSONClassificationTreeInit = function (that, oemValue) {
		debugger;
		busyDialog.open();
		var oDataModel = that.getOwnerComponent().getModel("oDataModelSP");
		oDataModel.read("/ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + HeaderClass +
			"' and PCN eq '" +
			window.selectedpcn + "'", null, null, true,
			function (oData, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("oClassJsonModel").setData(oData); //temp json
				that.getOwnerComponent().getModel("CharValueJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
				that.getOwnerComponent().getModel("SubClassJsonModel").setData(oData.results[0].ET_SUB_CLASSNav); //json for sub class
				that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
				that.ClassificationTreeJSON.results.push(oData.results[0]);

				var oViewID = that.getView().sId;
				var ClassificationTree;
				if (oViewID.search("newmaterial") > -1) {
					ClassificationTree = that.byId("idIconTabBarRequestNewMaterial");
					// var AtklaOEMNum
				} else if (oViewID.search("search") > -1) {
					ClassificationTree = that.byId("idIconTabBarClassificationTree");
				}

				var keyIndex = ClassificationTree.getItems().length;
				keyIndex = parseInt(keyIndex) + 1;
				var HeaderBar = new sap.m.Bar({
					contentRight: []
				});
				var FooterBar = new sap.m.Bar({
					contentRight: [new sap.m.Button({
						text: "Next",
						type: sap.m.ButtonType.Emphasized,
						press: function (oEvent) {
							debugger;
							// if (!oSearchController.ClassificationTreeJSON) {
							var oView = that.getView();
							that.oDynamicSubClassDialogNewMat = oView.byId("SubClassDialogid");
							if (!that.oDynamicSubClassDialogNewMat) {
								// create dialog via fragment factory
								that.oDynamicSubClassDialogNewMat = sap.ui.xmlfragment(oView.getId(),
									"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
									this.oDynamicSubClassDialogNewMat);
								// connect dialog to view (models, lifecycle)
								oView.addDependent(that.oDynamicSubClassDialogNewMat);
								that.oDynamicSubClassDialogNewMat.attachConfirm(that.onSubClasshandleConfirm);
								that.oDynamicSubClassDialogNewMat.attachCancel(that.onSubClasshandleClose);
							}
							that.oDynamicSubClassDialogNewMat.open();
							// } else {
							// 	sap.m.MessageBox
							// 		.error(" You have already selected Sub Class");
							// }
						}
					})],
				});
				var FlexBoxInfo = new sap.m.FlexBox({
					width: "100%",
					direction: sap.m.FlexDirection.Row,
					justifyContent: "End",
					items: [
						new sap.m.Label({
							required: true,
							text: ":"
						}).addStyleClass("paddingSplit"),
						new sap.m.Label({
							text: "MandatoryChar"
						}).addStyleClass("paddingSmall"),
						new sap.m.Label({
							text: "Bold Text:",
							design: "Bold"
						}).addStyleClass("paddingSplit"),
						new sap.m.Label({
							text: "ShortTxtRelChar"
						}).addStyleClass("paddingSmall"),
					]
				});

				var GridIconTabContent = new sap.ui.layout.Grid({
					defaultSpan: "XL6 L6 M6 S6",
					content: []
				});
				var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
				for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
					var setDesign;
					var setRequired;
					var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
					if (shorttext == "X") {
						setDesign = sap.m.LabelDesign.Bold;
					} else {
						setDesign = sap.m.LabelDesign.Standard;
					}
					var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
					if (mandatory == "X") {
						setRequired = true;
					} else {
						setRequired = false;
					}
					var inputType = CharValueJsonModel.getData().results[a].DATATYP;
					if (inputType == "CHAR") {
						inputType = "Text"
					} else if (inputType == "NUM") {
						inputType = "Number"
					}
					
					//to check the Drop only property
					var dropOnly = CharValueJsonModel.getData().results[a].DROPONLY;
					var noHelp = CharValueJsonModel.getData().results[a].NOHELP;
					/*if(dropOnly == "X"){
						dropOnly = true
						
					}else{
						dropOnly = false
						if(noHelp == "X"){
							noHelp = false
						}
						else{
							noHelp = true
							
						}
					}*/
					
					if(noHelp == "X"){
							noHelp = false
					}
					else{
						noHelp = true
					}
					
					var CHARLEN = parseInt(CharValueJsonModel.getData().results[a].CHARLEN);
					// var CHARLEN = (CharValueJsonModel.getData().results[a].CHARLEN);
					var HBox = new sap.m.HBox({
						// alignItems: "Stretch",
						justifyContent: "End",
						items: [
							new sap.m.Label({
								text: CharValueJsonModel.getData().results[a].DESC,
								design: setDesign,
								required: setRequired
							}).addStyleClass("oDynamicLabelPadding"),
							new sap.m.Input({
								placeholder: "Type New Char Value",
								value: CharValueJsonModel.getData().results[a].DEFVALUE,
							//	maxLength: CHARLEN,
								// type:inputType,
								showValueHelp: noHelp,
								width: "180px",
							/*	valueHelpOnly:dropOnly,
								enabled:true,
								editable:true,*/
								valueHelpRequest: function (oEventInput) {
									debugger;
									that.selectedInput = oEventInput.getSource();
									var currentChar = oEventInput.getSource().getParent().getItems()[0].getText();
									var IcontabText = oEventInput.getSource().getParent().getParent().getParent().getText();
									for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
										if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
											// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
											for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
												if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
													that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav
														.results[i].ET_CHAR_VALUENav);
												}
											}
										}
									}
									if (oViewID.search("newmaterial") > -1) {
										oControllerObjReqNewMat.DuplicateFlag = "";
										oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").setText("");
										oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
										oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
										oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);

										// var AtklaOEMNum
									} else if (oViewID.search("search") > -1) {}
									var oView = that.getView();
									that.CharacteristicValueHelpDialogNewMat = oView.byId("CharacteristicValueHelp");
									if (!that.CharacteristicValueHelpDialogNewMat) {
										// create dialog via fragment factory
										that.CharacteristicValueHelpDialogNewMat = sap.ui.xmlfragment(oView.getId(),
											"z_app_spare_parts.z_spare_parts1.fragments.CharacteristicValueHelp",
											this.CharacteristicValueHelpDialogNewMat);
										// connect dialog to view (models, lifecycle)
										oView.addDependent(that.CharacteristicValueHelpDialogNewMat);
										that.CharacteristicValueHelpDialogNewMat.attachConfirm(function (oEvent) {
											debugger;

											var searchValue = "";
											var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
											// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
											var oBinding = oEvent.getSource().getBinding("items");
											var filters = new Array();
											filters.push(filterVALUE);
											// filters.push(filterPCNDesc);
											oBinding.filter(new sap.ui.model.Filter(filters, false));

											var sSelectedValue = oEvent.getParameters().selectedItem.getBindingContext("CharacteristicValueHelpJsonModel").getObject()
												.VALUE;
											that.selectedInput.setValue(sSelectedValue);

											var currentChar = that.selectedInput.getParent().getItems()[0].getText();
											// that.ClassificationTreeJSON
											var IcontabText = that.selectedInput.getParent().getParent().getParent().getText();
											
												
												
												
												
												
												
												
												
												
												
												
								// changes by Udit for value not coming in the characteristics of search by classification screen-  New Material
									for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
											if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
												// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
												for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
													if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "";
													}
												}
											}
										}
										
										//end________________________________
											
											
											for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
												if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
													// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
													for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
													
														// added by Udit
							/*if(that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[2].DEFVALUE=="Yes")*/
							if(currentChar=="Partnumber = OEM Partnumber"){
							if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								/*var selectedPartNumber = that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;*/
								var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(selectedPartNumber);
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
								
								that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(false);
								that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(false);
								
								that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(true);
								that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(true);
		

							}
							else if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart2=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(selectedPartNumber);
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue("");
								
								that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(false);
								that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(false);
								
									that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(true);
								that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(true);
							}
							}else if(currentChar=="PARTNUMBER" ){
									if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								/*var selectedPartNumber = that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;*/
								var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(selectedPartNumber);
							}
							else if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart2=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(selectedPartNumber);
							}
							}
							
							// till here
													
													
													
													
													
													
													
													
														if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
															var oViewID = that.getView().sId;
															var ClassificationTree;
															if (oViewID.search("newmaterial") > -1) {
																/*	if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == "PARTNUMBER" || that.ClassificationTreeJSON
																		.results[b].ET_CLASS_CHARNav.results[i].NAME == "PN") {
																		if (oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").getSelected() == true) {
																			oControllerObjReqNewMat.setNoOEMFLAG = "X";
																			oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(sSelectedValue);
																			oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue("");
																		} else {
																			oControllerObjReqNewMat.setNoOEMFLAG = "";
																			oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
																			oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(sSelectedValue);
																		}
																	}*/
															}

															that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
															that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "";
														}
													}
												}
											}
											//start
											//start udit to remove the red error state of input and icon Tab
								var iconTabBar = that.byId("idIconTabBarRequestNewMaterial");
							var classTreeJSON = that.ClassificationTreeJSON.results;
							for (var t = 0; t < classTreeJSON.length; t++) {
								for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
									// if (z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag() == false) {
									if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
										/*if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE) {*/
										if (sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar) {
											//commented below 2 lines because it is giving error
											iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None"); 
												iconTabBar.getItems()[t].setIconColor("Neutral");
											
											
										/*}else if(!classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE){*/
										}else if(!sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
												iconTabBar.getItems()[t].setIconColor("Negative");
										}
									}
								}
							}
								//end
											//end
										});
										that.CharacteristicValueHelpDialogNewMat.attachSearch(function (oEvent) {
											debugger;
											var searchValue = oEvent.getParameter('value');
											var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
											// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
											var oBinding = oEvent.getSource().getBinding("items");
											var filters = new Array();
											filters.push(filterVALUE);
											// filters.push(filterPCNDesc);
											oBinding.filter(new sap.ui.model.Filter(filters, false));
										});
									}
									that.CharacteristicValueHelpDialogNewMat.open();
								},
								liveChange: function (oEvent) {
									debugger;

									var sSelectedValue = oEvent.getSource().getValue();

									var currentChar = oEvent.getSource().getParent().getItems()[0].getText();
									// that.ClassificationTreeJSON
									var IcontabText = oEvent.getSource().getParent().getParent().getParent().getText();
									for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
									
								
								
									
									
										// added by Udit
							/*if(that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[2].DEFVALUE=="Yes")*/
							if(currentChar== "PARTNUMBER" && that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								/*var selectedPartNumber = that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;*/
								/*var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(selectedPartNumber);*/
							
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(sSelectedValue);
							/*	that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
								
								that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(false);
								that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(false);
								
								that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(true);
								that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(true);*/
		

							}
							else if(currentChar== "PARTNUMBER" && that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart2=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
							/*	var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(selectedPartNumber);*/
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(sSelectedValue);
								/*that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue("");
								
								that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(false);
								that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(false);
								
									that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(true);
								that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(true);*/
							}
							// till here
									
									
										if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
											// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
											for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
												if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
													that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
													that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "X";
													if (oViewID.search("newmaterial") > -1) {
														/*	if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == "PARTNUMBER" || that.ClassificationTreeJSON
																.results[b].ET_CLASS_CHARNav.results[i].NAME == "PN") {
																if (oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").getSelected() == true) {
																	oControllerObjReqNewMat.setNoOEMFLAG = "X";
																	oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(sSelectedValue);
																	oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue("");
																} else {
																	oControllerObjReqNewMat.setNoOEMFLAG = "";
																	oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
																	oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(sSelectedValue);
																}
															}*/
													}
												}
											}
										}
									}
										
										
										
										
										
										//start udit to remove the red error state of input and icon Tab
							var iconTabBar = that.byId("idIconTabBarRequestNewMaterial");
							var classTreeJSON = that.ClassificationTreeJSON.results;
							for (var t = 0; t < classTreeJSON.length; t++) {
								for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
								
									if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
									
										if (sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar) {
											iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
											iconTabBar.getItems()[t].setIconColor("Neutral");
									
										}else if(!sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
												iconTabBar.getItems()[t].setIconColor("Negative");
										}
									}
								}
							}
								//end
									
									
									if (oViewID.search("newmaterial") > -1) {
										oControllerObjReqNewMat.DuplicateFlag = "";
										oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").setText("");
										oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
										oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
										oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);

										// var AtklaOEMNum
									} else if (oViewID.search("search") > -1) {}
									
									
								}

							})
						]
					});
					GridIconTabContent.addContent(HBox);
				}

				ClassificationTree.addItem(new sap.m.IconTabFilter({
					visible: true,
					key: keyIndex,
					icon: "sap-icon://hint",
					text: oData.results[0].Class,
					content: [
						HeaderBar,
						// FormForIconTabContent,
						GridIconTabContent,
						FooterBar,
						FlexBoxInfo
					]
				}));
				keyIndex = keyIndex.toString();
				ClassificationTree.setSelectedKey(keyIndex);
				ClassificationTree.getItems()[0].getContent()[1].getContent()[0].getItems()[1].setValue(oemValue);

				busyDialog.close();
			},
			function (oError) {
				debugger;
				busyDialog.close();
				sap.m.MessageBox
					.error(" Data fetch failed");
			});
	},

	z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTreeOnBack = function (oSubClass, that, ClassificationTree,
		previousIndex) {
		debugger;
		//	busyDialog.open();
		var oDataModel = that.getOwnerComponent().getModel("oDataModelSP");
		oDataModel.read("/ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + oSubClass +
			"' and PCN eq '" + window.selectedpcn + "'", null, null, true,
			function (oData, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("oClassJsonModel").setData(oData); //temp json
				that.getOwnerComponent().getModel("CharValueJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
				that.getOwnerComponent().getModel("SubClassJsonModel").setData(oData.results[0].ET_SUB_CLASSNav); //json for sub class
				that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
				//	busyDialog.close();
				if (oData.results[0].LEAF == "X") {
					ClassificationTree.getItems()[previousIndex].getContent()[2].getContentRight()[0].setVisible(false);
					that.ClassificationTreeJSON[previousIndex].LEAF = "X";
				} else {
					ClassificationTree.getItems()[previousIndex].getContent()[2].getContentRight()[0].setVisible(true);
					that.ClassificationTreeJSON[previousIndex].LEAF = "";
				}
			},
			function (oError) {
				debugger;
				//	busyDialog.close();
				sap.m.MessageBox
					.error(" Data fetch failed");
			});
	},
	z_app_spare_parts.z_spare_parts1.util.SubClassContent.createContent = function (oEvent, oSubClass, that) {
		debugger;
		//	busyDialog.open();
		var ClassificationTree = that.getView().byId("idIconTabBarClassificationTree");
		var keyIndex = ClassificationTree.getItems().length;
		keyIndex = parseInt(keyIndex) + 1;
		var HeaderBar = new sap.m.Bar({
			contentRight: [new sap.m.Button({
				text: "Back",
				type: sap.m.ButtonType.Reject,
				press: function (oEvent) {
					debugger;
					BtnNextForLeafDisable = oEvent.getSource().getParent().getParent().getContent()[2].getContentRight()[0];
					var copyoClassificationTreeJSON = that.ClassificationTreeJSON.results;
					var ClassificationTree = that.getView().byId("idIconTabBarClassificationTree");
					var ClassTreeLen = ClassificationTree.getItems().length;
					var SelectedIndex = oEvent.getSource().getParent().getParent().getParent().getSelectedKey();
					SelectedIndex = SelectedIndex - 1;
					if (SelectedIndex < ClassTreeLen) {
						for (var i = SelectedIndex; i < ClassTreeLen; i++) {
							copyoClassificationTreeJSON.splice(i, 1);
							ClassificationTree.getItems()[SelectedIndex].destroy();

						}
					} else {
						oEvent.getSource().getParent().getParent().destroy();
						copyoClassificationTreeJSON.splice(0, 1);
					}
					ClassificationTree = that.getView().byId("idIconTabBarClassificationTree");
					ClassTreeLen = ClassificationTree.getItems().length;
					var currentIndex = ClassTreeLen - 1;
					var oSubClass = ClassificationTree.getItems()[currentIndex].getText();
					z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTreeOnBack(oSubClass, that, ClassificationTree,
						currentIndex);
					debugger;
					BtnNextForLeafDisable.setVisible(false);

				}
			})]
		});
		var FooterBar = new sap.m.Bar({
			contentRight: [new sap.m.Button({
				text: "Next",
				type: sap.m.ButtonType.Emphasized,
				press: function (oEvent) {
					debugger;
					// if (!that.ClassificationTreeJSON) {
					var oView = that.getView();
					that.oDynamicSubClassDialogCopyMat = oView.byId("SubClassDialogid");
					if (!that.oDynamicSubClassDialogCopyMat) {
						// create dialog via fragment factory
						that.oDynamicSubClassDialogCopyMat = sap.ui.xmlfragment(oView.getId(),
							"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
							this.oDynamicSubClassDialogCopyMat);
						// connect dialog to view (models, lifecycle)
						oView.addDependent(that.oDynamicSubClassDialogCopyMat);
						that.oDynamicSubClassDialogCopyMat.attachConfirm(that.onSubClasshandleConfirm);
						that.oDynamicSubClassDialogCopyMat.attachCancel(that.onSubClasshandleClose);
					}
					that.oDynamicSubClassDialogCopyMat.open();
					// } else {
					// 	sap.m.MessageBox
					// 		.error(" You have already selected Sub Class");
					// }
				}
			})],
		});
		var FlexBoxInfo = new sap.m.FlexBox({
			width: "100%",
			direction: sap.m.FlexDirection.Row,
			justifyContent: "End",
			items: [
				new sap.m.Label({
					required: true,
					text: ":"
				}).addStyleClass("paddingSplit"),
				new sap.m.Label({
					text: "MandatoryChar"
				}).addStyleClass("paddingSmall"),
				new sap.m.Label({
					text: "Bold Text:",
					design: "Bold"
				}).addStyleClass("paddingSplit"),
				new sap.m.Label({
					text: "ShortTxtRelChar"
				}).addStyleClass("paddingSmall"),
			]
		});

		var GridIconTabContent = new sap.ui.layout.Grid({
			defaultSpan: "XL6 L6 M6 S6",
			content: []
		});
		var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
		for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
			var setDesign;
			var setRequired;
			var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
			if (shorttext == "X") {
				setDesign = sap.m.LabelDesign.Bold;
			} else {
				setDesign = sap.m.LabelDesign.Standard;
			}
			var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
			if (mandatory == "X") {
				setRequired = true;
			} else {
				setRequired = false;
			}
			var inputType = CharValueJsonModel.getData().results[a].DATATYP;
			if (inputType == "CHAR") {
				inputType = "Text"
			} else if (inputType == "NUM") {
				inputType = "Number"
			}
			var CHARLEN = parseInt(CharValueJsonModel.getData().results[a].CHARLEN);
			// var CHARLEN = (CharValueJsonModel.getData().results[a].CHARLEN);
			var HBox = new sap.m.HBox({
				// alignItems: "Stretch",
				justifyContent: "End",
				items: [
					new sap.m.Label({
						text: CharValueJsonModel.getData().results[a].DESC,
						design: setDesign,
						required: setRequired
					}).addStyleClass("oDynamicLabelPadding"),
					new sap.m.Input({
						placeholder: "Type New Char Value",
						value: CharValueJsonModel.getData().results[a].DEFVALUE,
						showValueHelp: true,
							width: "180px",
						// maxLength: CHARLEN,
						type: inputType
					})
				]
			});
			GridIconTabContent.addContent(HBox);
		}

		ClassificationTree.addItem(new sap.m.IconTabFilter({
			visible: true,
			key: keyIndex,
			icon: "sap-icon://hint",
			text: oSubClass,
			content: [
				HeaderBar,
				// FormForIconTabContent,
				GridIconTabContent,
				FooterBar,
				FlexBoxInfo
			]
		}));
		keyIndex = keyIndex.toString();
		ClassificationTree.setSelectedKey(keyIndex);
		//	busyDialog.close();
	};
z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSON_Content_ClassificationTree = function (oEvent, oSubClass, that) {
	debugger;
	busyDialog.open();
	oSearchController = that;
	var oDataModel = that.getOwnerComponent().getModel("oDataModelSP");
	//	/sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/ZC_MM_GET_CONFIG(p_appl='SPARE_PARTS',p_field=’PCN’)/Set
	// /ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + window.SelectedCluster + "' and PCN eq '" + window.SelectedCluster + "'
	// var that = this;
	oDataModel.read("/ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + oSubClass +
		"' and PCN eq '" + window.selectedpcn + "'", null, null, true,
		function (oData, oResponse) {
			debugger;

			that.getOwnerComponent().getModel("oClassJsonModel").setData(oData); //temp json
			that.getOwnerComponent().getModel("CharValueJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
			that.getOwnerComponent().getModel("SubClassJsonModel").setData(oData.results[0].ET_SUB_CLASSNav); //json for sub class
			that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
			that.ClassificationTreeJSON.results.push(oData.results[0]);

			debugger;

			// var selectedSubClass = oEvent.getParameters().selectedItem.getBindingContext("SubClassJsonModel").getObject().Class;
			var LeafNode = oData.results[0].LEAF; //set leaf node
			var setVisibleNextButton;
			if (LeafNode == "X") {
				setVisibleNextButton = false;
			} else {
				setVisibleNextButton = true;
			}

			var ClassificationTree = that.getView().byId("idIconTabBarClassificationTree");
			var keyIndex = ClassificationTree.getItems().length;
			keyIndex = parseInt(keyIndex) + 1;
			var HeaderBar = new sap.m.Bar({
				contentRight: [new sap.m.Button({
					text: "Back",
					type: sap.m.ButtonType.Reject,
					press: function (oEvent) {
						debugger;
						BtnNextForLeafDisable = oEvent.getSource().getParent().getParent().getContent()[2].getContentRight()[0];
						var copyoClassificationTreeJSON = that.ClassificationTreeJSON.results;
						var ClassificationTree = that.getView().byId("idIconTabBarClassificationTree");
						var ClassTreeLen = ClassificationTree.getItems().length;
						// ClassTreeLen = ClassTreeLen;
						var SelectedIndex = oEvent.getSource().getParent().getParent().getParent().getSelectedKey();
						SelectedIndex = SelectedIndex - 1;
						if (SelectedIndex < ClassTreeLen) {
							for (var i = SelectedIndex; i < ClassTreeLen; i++) {
								copyoClassificationTreeJSON.splice(SelectedIndex, 1);
								ClassificationTree.getItems()[SelectedIndex].destroy();
							}
						}
						ClassificationTree = that.getView().byId("idIconTabBarClassificationTree");
						ClassTreeLen = ClassificationTree.getItems().length;
						var previousIndex = ClassTreeLen - 1;
						var oSubClass = ClassificationTree.getItems()[previousIndex].getText();
						z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTreeOnBack(oSubClass, that, ClassificationTree,
							previousIndex);
						debugger;
						var oTable = that.getView().byId("LineItemsSmartTableSearchByClassTree");
						oTable.destroyColumns();
						oTable.destroyRows();

					}
				})]
			});
			var FooterBar = new sap.m.Bar({
				contentRight: [new sap.m.Button({
					text: "Next",
					visible: setVisibleNextButton,
					type: sap.m.ButtonType.Emphasized,
					press: function (oEvent) {
						debugger;
						// if (!oSearchController.ClassificationTreeJSON) {
						var oView = that.getView();
						that.oDynamicSubClassDialogSearch = oView.byId("SubClassDialogid");
						if (!that.oDynamicSubClassDialogSearch) {
							// create dialog via fragment factory
							that.oDynamicSubClassDialogSearch = sap.ui.xmlfragment(oView.getId(),
								"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
								this.oDynamicSubClassDialogSearch);
							// connect dialog to view (models, lifecycle)
							oView.addDependent(that.oDynamicSubClassDialogSearch);
							that.oDynamicSubClassDialogSearch.attachConfirm(that.onSubClasshandleConfirm);
							that.oDynamicSubClassDialogSearch.attachCancel(that.onSubClasshandleClose);
						}
						that.oDynamicSubClassDialogSearch.open();
						// } else {
						// 	sap.m.MessageBox
						// 		.error(" You have already selected Sub Class");
						// }
					}
				})],
			});
			var FlexBoxInfo = new sap.m.FlexBox({
				width: "100%",
				direction: sap.m.FlexDirection.Row,
				justifyContent: "End",
				items: [
					new sap.m.Label({
						required: true,
						text: ":"
					}).addStyleClass("paddingSplit"),
					new sap.m.Label({
						text: "MandatoryChar"
					}).addStyleClass("paddingSmall"),
					new sap.m.Label({
						text: "Bold Text:",
						design: "Bold"
					}).addStyleClass("paddingSplit"),
					new sap.m.Label({
						text: "ShortTxtRelChar"
					}).addStyleClass("paddingSmall"),
				]
			});

			var GridIconTabContent = new sap.ui.layout.Grid({
				defaultSpan: "XL6 L6 M6 S6",
				content: []
			});
			var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
			for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
				var setDesign;
				var setRequired;
				var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
				if (shorttext == "X") {
					setDesign = sap.m.LabelDesign.Bold;
				} else {
					setDesign = sap.m.LabelDesign.Standard;
				}
				var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
				if (mandatory == "X") {
					setRequired = true;
				} else {
					setRequired = false;
				}
				
				var dropOnly = CharValueJsonModel.getData().results[a].DROPONLY;
				if(dropOnly == "X"){
						dropOnly = true
					}else{
						dropOnly = false
					}
					
				//code added so that axis designation will not get value help Udit kandh For Search By Classification Tree
					var noHelp = CharValueJsonModel.getData().results[a].NOHELP;
					if(noHelp == "X"){
						noHelp = false
					}else{
						noHelp = true
					}	
					
					
				var inputType = CharValueJsonModel.getData().results[a].DATATYP;
				if (inputType == "CHAR") {
					inputType = "Text"
				} else if (inputType == "NUM") {
					inputType = "Number"
				}
				var CHARLEN = parseInt(CharValueJsonModel.getData().results[a].CHARLEN);
				// var CHARLEN = (CharValueJsonModel.getData().results[a].CHARLEN);
				var HBox = new sap.m.HBox({
					// alignItems: "Stretch",
					justifyContent: "End",
					items: [
						new sap.m.Label({
							text: CharValueJsonModel.getData().results[a].DESC,
							design: setDesign,
							required: setRequired
						}).addStyleClass("oDynamicLabelPadding"),
						new sap.m.Input({
							placeholder: "Type New Char Value",
							value: CharValueJsonModel.getData().results[a].DEFVALUE,
							// maxLength: CHARLEN,
							// type: inputType,
								width: "180px",
							showValueHelp: noHelp,
							valueHelpOnly:dropOnly,
							enabled:true,
							editable:true,
							
							valueHelpRequest: function (oEventInput) {
								debugger;
								that.selectedInput = oEventInput.getSource();
								var currentChar = oEventInput.getSource().getParent().getItems()[0].getText();
								that.ClassificationTreeJSON
								var IcontabText = oEventInput.getSource().getParent().getParent().getParent().getText();
								for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
									if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
										// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
										for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
												that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav
													.results[i].ET_CHAR_VALUENav);
											}
										}
									}
								}

								var oView = that.getView();
								that.CharacteristicValueHelpDialog = oView.byId("CharacteristicValueHelp");
								if (!that.CharacteristicValueHelpDialog) {
									// create dialog via fragment factory
									that.CharacteristicValueHelpDialog = sap.ui.xmlfragment(oView.getId(),
										"z_app_spare_parts.z_spare_parts1.fragments.CharacteristicValueHelp",
										this.CharacteristicValueHelpDialog);
									// connect dialog to view (models, lifecycle)
									oView.addDependent(that.CharacteristicValueHelpDialog);
									/*	this.oDialog2.attachSearch(this.onhandleSearch);
										this.oDialog2.attachCancel(this.onhandleClose);*/
									that.CharacteristicValueHelpDialog.attachConfirm(function (oEvent) {
										debugger;
										var searchValue = "";
										var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
										// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
										var oBinding = oEvent.getSource().getBinding("items");
										var filters = new Array();
										filters.push(filterVALUE);
										// filters.push(filterPCNDesc);
										oBinding.filter(new sap.ui.model.Filter(filters, false));
										var sSelectedValue = oEvent.getParameters().selectedItem.getBindingContext("CharacteristicValueHelpJsonModel").getObject()
											.VALUE;
										that.selectedInput.setValue(sSelectedValue);

										var currentChar = that.selectedInput.getParent().getItems()[0].getText();
										// that.ClassificationTreeJSON
										var IcontabText = that.selectedInput.getParent().getParent().getParent().getText();
										for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
											if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
												// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
												for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
													if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "";
													}
												}
											}
										}
									});
									that.CharacteristicValueHelpDialog.attachSearch(function (oEvent) {
										debugger;
										var searchValue = oEvent.getParameter('value');
										var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
										// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
										var oBinding = oEvent.getSource().getBinding("items");
										var filters = new Array();
										filters.push(filterVALUE);
										// filters.push(filterPCNDesc);
										oBinding.filter(new sap.ui.model.Filter(filters, false));
									});
								}
								that.CharacteristicValueHelpDialog.open();
							},
							liveChange: function (oEvent) {
								debugger;

								var sSelectedValue = oEvent.getSource().getValue();
								var currentChar = oEvent.getSource().getParent().getItems()[0].getText();
								var IcontabText = oEvent.getSource().getParent().getParent().getParent().getText();
								for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
									if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
										// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
										for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
												that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
												that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "X"
											}
										}
									}
								}
							}
						})
					]
				});
				GridIconTabContent.addContent(HBox);
			}

			ClassificationTree.addItem(new sap.m.IconTabFilter({
				visible: true,
				key: keyIndex,
				icon: "sap-icon://hint",
				text: oSubClass,
				content: [
					HeaderBar,
					// FormForIconTabContent,
					GridIconTabContent,
					FooterBar,
					FlexBoxInfo
				]
			}));
			keyIndex = keyIndex.toString();
			ClassificationTree.setSelectedKey(keyIndex);
			busyDialog.close();
		},
		function (oError) {
			debugger;
			busyDialog.close();
			sap.m.MessageBox
				.error(" Data fetch failed");
		});
};

z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSON_Content_ClassificationTree_NewMaterial = function (oEvent, oSubClass, that) {
	debugger;
	//	busyDialog.open();
	var oDataModel = that.getOwnerComponent().getModel("oDataModelSP");
	oDataModel.read("/ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + oSubClass +
		"' and PCN eq '" + window.selectedpcn + "'", null, null, true,
		function (oData, oResponse) {
			debugger;

			that.getOwnerComponent().getModel("oClassJsonModel").setData(oData); //temp json
			that.getOwnerComponent().getModel("CharValueJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
			that.getOwnerComponent().getModel("SubClassJsonModel").setData(oData.results[0].ET_SUB_CLASSNav); //json for sub class
			that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
			that.ClassificationTreeJSON.results.push(oData.results[0]);
			var LeafNode = oData.results[0].LEAF; //set leaf node
			var setVisibleNextButton;
			if (LeafNode == "X") {
				setVisibleNextButton = false;
			} else {
				setVisibleNextButton = true;
			}
			// code to fill content of header bar, content of icon tab and footer bar
			var ClassificationTree = that.getView().byId("idIconTabBarRequestNewMaterial");
			var keyIndex = ClassificationTree.getItems().length;
			keyIndex = parseInt(keyIndex) + 1;
			var HeaderBar = new sap.m.Bar({
				contentRight: [new sap.m.Button({
					text: "Back",
					type: sap.m.ButtonType.Reject,
					press: function (oEvent) {
						debugger;
						BtnNextForLeafDisable = oEvent.getSource().getParent().getParent().getContent()[2].getContentRight()[0];
						var copyoClassificationTreeJSON = that.ClassificationTreeJSON.results;
						var ClassificationTree = that.getView().byId("idIconTabBarRequestNewMaterial");
						var ClassTreeLen = ClassificationTree.getItems().length;
						var SelectedIndex = oEvent.getSource().getParent().getParent().getParent().getSelectedKey();
						SelectedIndex = SelectedIndex - 1;
						if (SelectedIndex < ClassTreeLen) {
							for (var i = SelectedIndex; i < ClassTreeLen; i++) {
								copyoClassificationTreeJSON.splice(SelectedIndex, 1);
								ClassificationTree.getItems()[SelectedIndex].destroy();
							}
						}
						ClassificationTree = that.getView().byId("idIconTabBarRequestNewMaterial");
						ClassTreeLen = ClassificationTree.getItems().length;
						var previousIndex = ClassTreeLen - 1;
						var oSubClass = ClassificationTree.getItems()[previousIndex].getText();
						that.DuplicateFlag = "";
						that.getView().byId("idShortText_ReqNewMat").setText("");
						that.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
						that.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
						that.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
						z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTreeOnBack(oSubClass, that, ClassificationTree,
							previousIndex);
						debugger;
					}
				})]
			});
			var FooterBar = new sap.m.Bar({
				contentRight: [new sap.m.Button({
					text: "Next",
					visible: setVisibleNextButton,
					type: sap.m.ButtonType.Emphasized,
					press: function (oEvent) {
						debugger;
						// if (!oSearchController.ClassificationTreeJSON) {
						var oView = that.getView();
						that.oDynamicSubClassDialogNewMat = oView.byId("SubClassDialogid");
						if (!that.oDynamicSubClassDialogNewMat) {
							// create dialog via fragment factory
							that.oDynamicSubClassDialogNewMat = sap.ui.xmlfragment(oView.getId(),
								"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
								this.oDynamicSubClassDialogNewMat);
							// connect dialog to view (models, lifecycle)
							oView.addDependent(that.oDynamicSubClassDialogNewMat);
							that.oDynamicSubClassDialogNewMat.attachConfirm(that.onSubClasshandleConfirm);
							that.oDynamicSubClassDialogNewMat.attachCancel(that.onSubClasshandleClose);
						}
						that.oDynamicSubClassDialogNewMat.open();
						// } else {
						// 	sap.m.MessageBox
						// 		.error(" You have already selected Sub Class");
						// }
					}
				})],
			});
			var FlexBoxInfo = new sap.m.FlexBox({
				width: "100%",
				direction: sap.m.FlexDirection.Row,
				justifyContent: "End",
				items: [
					new sap.m.Label({
						required: true,
						text: ":"
					}).addStyleClass("paddingSplit"),
					new sap.m.Label({
						text: "MandatoryChar"
					}).addStyleClass("paddingSmall"),
					new sap.m.Label({
						text: "Bold Text:",
						design: "Bold"
					}).addStyleClass("paddingSplit"),
					new sap.m.Label({
						text: "ShortTxtRelChar"
					}).addStyleClass("paddingSmall"),
				]
			});

			var GridIconTabContent = new sap.ui.layout.Grid({
				defaultSpan: "XL6 L6 M6 S6",
				content: []
			});
			var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
			for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
				var setDesign;
				var setRequired;
				var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
				if (shorttext == "X") {
					setDesign = sap.m.LabelDesign.Bold;
				} else {
					setDesign = sap.m.LabelDesign.Standard;
				}
				var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
				if (mandatory == "X") {
					setRequired = true;
				} else {
					setRequired = false;
				}
				var inputType = CharValueJsonModel.getData().results[a].DATATYP;
				if (inputType == "CHAR") {
					inputType = "Text"
				} else if (inputType == "NUM") {
					inputType = "Number"
				}
				
				var dropOnly = CharValueJsonModel.getData().results[a].DROPONLY;
				if(dropOnly == "X"){
						dropOnly = true
					}else{
						dropOnly = false
					}
					
					//code added for value help not needed in Axix characteristics udit kandh
				var noHelp = CharValueJsonModel.getData().results[a].NOHELP;	
				if(noHelp == "X"){
					noHelp = false;
				}else{
					noHelp = true;
				}
				
				var CHARLEN = parseInt(CharValueJsonModel.getData().results[a].CHARLEN);
				// var CHARLEN = (CharValueJsonModel.getData().results[a].CHARLEN);
				var HBox = new sap.m.HBox({
					// alignItems: "Stretch",
					justifyContent: "End",
					items: [
						new sap.m.Label({
							text: CharValueJsonModel.getData().results[a].DESC,
							design: setDesign,
							required: setRequired
						}).addStyleClass("oDynamicLabelPadding"),
						new sap.m.Input({
							placeholder: "Type New Char Value",
							value: CharValueJsonModel.getData().results[a].DEFVALUE,
							// maxLength: CHARLEN,
							// type:inputType,
								width: "180px",
							showValueHelp: noHelp,
						valueHelpOnly: dropOnly,
							enabled:true,
							editable:true,
							
							valueHelpRequest: function (oEventInput) {
								debugger;
								that.selectedInput = oEventInput.getSource();
								var currentChar = oEventInput.getSource().getParent().getItems()[0].getText();
								that.ClassificationTreeJSON
								var IcontabText = oEventInput.getSource().getParent().getParent().getParent().getText();
								
								
								for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
									if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
										// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
										for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
												that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav
													.results[i].ET_CHAR_VALUENav);
											}
										}
									}
								}
								oControllerObjReqNewMat.DuplicateFlag = "";
								oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").setText("");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
								oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);

								var oView = that.getView();
								that.CharacteristicValueHelpDialogNewMat = oView.byId("CharacteristicValueHelp");
								if (!that.CharacteristicValueHelpDialogNewMat) {
									// create dialog via fragment factory
									that.CharacteristicValueHelpDialogNewMat = sap.ui.xmlfragment(oView.getId(),
										"z_app_spare_parts.z_spare_parts1.fragments.CharacteristicValueHelp",
										this.CharacteristicValueHelpDialogNewMat);
									// connect dialog to view (models, lifecycle)
									oView.addDependent(that.CharacteristicValueHelpDialogNewMat);
									that.CharacteristicValueHelpDialogNewMat.attachConfirm(function (oEvent) {
										debugger;
										var searchValue = "";
										var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
										// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
										var oBinding = oEvent.getSource().getBinding("items");
										var filters = new Array();
										filters.push(filterVALUE);
										// filters.push(filterPCNDesc);
										oBinding.filter(new sap.ui.model.Filter(filters, false));
										var sSelectedValue = oEvent.getParameters().selectedItem.getBindingContext("CharacteristicValueHelpJsonModel").getObject()
											.VALUE;
										that.selectedInput.setValue(sSelectedValue);

										var currentChar = that.selectedInput.getParent().getItems()[0].getText();
										// that.ClassificationTreeJSON
										var IcontabText = that.selectedInput.getParent().getParent().getParent().getText();
										
									
										//start udit to remove the red error state of input and icone Tab
								var iconTabBar = that.byId("idIconTabBarRequestNewMaterial");
							var classTreeJSON = that.ClassificationTreeJSON.results;
							for (var t = 0; t < classTreeJSON.length; t++) {
								for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
									// if (z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag() == false) {
									if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
									/*	if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE) {*/
									if (sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar) {
											iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
											iconTabBar.getItems()[t].setIconColor("Neutral");
										}else if(!sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
												iconTabBar.getItems()[t].setIconColor("Negative");
										}
									}
								}
							}
								//end
										
										for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
											if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
												// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
												for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
													if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "";
													}
												}
											}
										}
									});
									that.CharacteristicValueHelpDialogNewMat.attachSearch(function (oEvent) {
										debugger;
										var searchValue = oEvent.getParameter('value');
										var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
										// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
										var oBinding = oEvent.getSource().getBinding("items");
										var filters = new Array();
										filters.push(filterVALUE);
										// filters.push(filterPCNDesc);
										oBinding.filter(new sap.ui.model.Filter(filters, false));
									});
								}
								that.CharacteristicValueHelpDialogNewMat.open();
							},
							liveChange: function (oEvent) {
								debugger;

								var sSelectedValue = oEvent.getSource().getValue();

								var currentChar = oEvent.getSource().getParent().getItems()[0].getText();
								// that.ClassificationTreeJSON
								var IcontabText = oEvent.getSource().getParent().getParent().getParent().getText();
								for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
									if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
										// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
										for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
												that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
												that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "X";
											}
										}
									}
								}
								
								oControllerObjReqNewMat.DuplicateFlag = "";
								oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").setText("");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
								oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
								
								
								//start udit to remove the red error state of input and icone Tab
								var iconTabBar = that.byId("idIconTabBarRequestNewMaterial");
							var classTreeJSON = that.ClassificationTreeJSON.results;
							for (var t = 0; t < classTreeJSON.length; t++) {
								for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
									// if (z_app_spare_parts.z_spare_parts1.util.ValidateClassificationTree.getValidateFlag() == false) {
									if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
										/*if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE) {*/
										if(sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
											iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
											iconTabBar.getItems()[t].setIconColor("Neutral");
										/*}else if(!classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE){*/
										}else if(!sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
												iconTabBar.getItems()[t].setIconColor("Negative");
										}
									}
								}
							}
								//end
							}
							

						})
					]
				});
				GridIconTabContent.addContent(HBox);
			}

			ClassificationTree.addItem(new sap.m.IconTabFilter({
				visible: true,
				key: keyIndex,
				icon: "sap-icon://hint",
				text: oSubClass,
				content: [
					HeaderBar,
					// FormForIconTabContent,
					GridIconTabContent,
					FooterBar,
					FlexBoxInfo
				]
			}));
			keyIndex = keyIndex.toString();
			ClassificationTree.setSelectedKey(keyIndex);
			//	busyDialog.close();
		},
		function (oError) {
			debugger;
			//	busyDialog.close();
			sap.m.MessageBox
				.error(" Data fetch failed");
		});
};
z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadReviewReqNewMatJSONClassificationTree = function (oControllerObjReqNewMat,
	oControllerObjReviewReqNewMat) {
	debugger;

	var ClassificationTree = oControllerObjReviewReqNewMat.getView().byId("idIconTabBarReviewRequestNewMaterial");

	// added by Udit FOR REMOVING STAR
							if(oControllerObjReqNewMat.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
								oControllerObjReviewReqNewMat.getView().byId("idinputsecondvendor_label_ReviewReqNewMat").setRequired(false);
								oControllerObjReviewReqNewMat.getView().byId("idinputoempartsecond_label_ReviewReqNewMat").setRequired(false);
								
								oControllerObjReviewReqNewMat.getView().byId("idinputfirstoemvendor_label_ReviewReqNewMat").setRequired(true);
								oControllerObjReviewReqNewMat.getView().byId("idinputoempartfirst_label_ReviewReqNewMat").setRequired(true);
		

							}
							else if(oControllerObjReqNewMat.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No")
							{
								oControllerObjReviewReqNewMat.getView().byId("idinputfirstoemvendor_label_ReviewReqNewMat").setRequired(false);
								oControllerObjReviewReqNewMat.getView().byId("idinputoempartfirst_label_ReviewReqNewMat").setRequired(false);
								
								oControllerObjReviewReqNewMat.getView().byId("idinputsecondvendor_label_ReviewReqNewMat").setRequired(true);
								oControllerObjReviewReqNewMat.getView().byId("idinputoempartsecond_label_ReviewReqNewMat").setRequired(true);
							}
							// till here

	for (var k = 0; k < oControllerObjReqNewMat.ClassificationTreeJSON.results.length; k++) {

		var FlexBoxInfo = new sap.m.FlexBox({
			width: "100%",
			direction: sap.m.FlexDirection.Row,
			justifyContent: "End",
			items: [
				new sap.m.Label({
					required: true,
					text: ":"
				}).addStyleClass("paddingSplit"),
				new sap.m.Label({
					text: "MandatoryChar"
				}).addStyleClass("paddingSmall"),
				new sap.m.Label({
					text: "Bold Text:",
					design: "Bold"
				}).addStyleClass("paddingSplit"),
				new sap.m.Label({
					text: "ShortTxtRelChar"
				}).addStyleClass("paddingSmall"),
			]
		});

		var GridIconTabContent = new sap.ui.layout.Grid({
			defaultSpan: "XL6 L6 M6 S6",
			content: []
		});
		var CharValueJsonModel = oControllerObjReqNewMat.getOwnerComponent().getModel("CharValueJsonModel");
		CharValueJsonModel.setData(oControllerObjReqNewMat.ClassificationTreeJSON.results[k].ET_CLASS_CHARNav);
		for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
			var setDesign;
			var setRequired;
			var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
			if (shorttext == "X") {
				setDesign = sap.m.LabelDesign.Bold;
			} else {
				setDesign = sap.m.LabelDesign.Standard;
			}
			var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
			if (mandatory == "X") {
				setRequired = true;
			} else {
				setRequired = false;
			}
			
			
			var HBox = new sap.m.HBox({
				// alignItems: "Stretch",
				justifyContent: "End",
				items: [
					new sap.m.Label({
						text: CharValueJsonModel.getData().results[a].DESC,
						design: setDesign,
						required: setRequired
					}).addStyleClass("oDynamicLabelPadding"),
					new sap.m.Text({
						text: CharValueJsonModel.getData().results[a].DEFVALUE,
					}).addStyleClass("paddingforTextClassTree"),
				]
			});
			GridIconTabContent.addContent(HBox);
		}
		var oSubClass = oControllerObjReqNewMat.ClassificationTreeJSON.results[k].Class;
		var keyIndex = parseInt(k) + 1;
		ClassificationTree.addItem(new sap.m.IconTabFilter({
			visible: true,
			key: keyIndex,
			icon: "sap-icon://hint",
			text: oSubClass,
			content: [
				// HeaderBar,
				// FormForIconTabContent,
				GridIconTabContent,
				// FooterBar,
				FlexBoxInfo
			]
		}));
		var setSelectedIndex = k.toString();
		ClassificationTree.setSelectedKey(setSelectedIndex);
	}
	// },
	// function (oError) {
	// 	debugger;
	// 	sap.m.MessageBox
	// 		.error(" Data fetch failed");
	// });
	//	busyDialog.close();
};
z_app_spare_parts.z_spare_parts1.util.SubClassContent.clearClassificationTreeSearch = function (oSearchController) {
		debugger;
		oSearchController.ClassificationTreeJSON = {
			results: []
		};
		var ClassificationTree = oSearchController.getView().byId("idIconTabBarClassificationTree")
		ClassificationTree.destroyItems();
		var HBox = new sap.m.HBox({
			justifyContent: "End",
			items: [
				new sap.m.Label({
					text: "TEST_OEM_NUM",
					design: "Bold",
				}).addStyleClass("oDynamicLabelPadding"),
				new sap.m.Input({
					placeholder: "Type New Char Value",
					value: "",
					//commented by Udit to correct width
					/*width: "auto"*/
						width: "180px",
						// id:"idoempartNumber_value_ReqNewMat",
				})
			]
		});
		var GridIconTabContent = new sap.ui.layout.Grid({
			defaultSpan: "XL6 L6 M6 S6",
			content: [HBox]
		});
		ClassificationTree.addItem(new sap.m.IconTabFilter({
			visible: true,
			key: 0,
			icon: "sap-icon://hint",
			text: HeaderClass,
			content: [
				GridIconTabContent,
				new sap.m.Bar({
					contentRight: [
						new sap.m.Button({
							text: "Select Sub Class",
							type: "Emphasized",
							press: function (oEvent) {
								debugger;
								if (!oSearchController.ClassificationTreeJSON) {
									oSearchController.ClassificationTreeJSON = {
										results: []
									};
									// var oSubClass = "SP_GIMM"
									var ClassificationTree = "";
									var previousIndex = "";
									z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTree(HeaderClass, oSearchController,
										ClassificationTree, previousIndex);
									var oView = oSearchController.getView();

									oSearchController.SubClassDialogNewMat = oView.byId("SubClassDialogid");
									if (!oSearchController.SubClassDialogNewMat) {
										// create dialog via fragment factory
										oSearchController.SubClassDialogNewMat = sap.ui.xmlfragment(oView.getId(),
											"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog", oSearchController.SubClassDialogNewMat);
										// connect dialog to view (models, lifecycle)
										oView.addDependent(oSearchController.SubClassDialogNewMat);
										oSearchController.SubClassDialogNewMat.attachConfirm(oSearchController.onSubClasshandleConfirm);
										oSearchController.SubClassDialogNewMat.attachCancel(oSearchController.onSubClasshandleClose);
									}
									oSearchController.SubClassDialogNewMat.open();
								} else if (oSearchController.ClassificationTreeJSON.results.length == 0 || oSearchController.ClassificationTreeJSON.results
									.length == 1) {

									oSearchController.ClassificationTreeJSON = {
										results: []
									};
									// var oSubClass = "SP_GIMM"
									var ClassificationTree = "";
									var previousIndex = "";
									z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTree(HeaderClass, oSearchController,
										ClassificationTree, previousIndex);
									var oView = oSearchController.getView();

									oSearchController.SubClassDialogNewMat = oView.byId("SubClassDialogid");
									if (!oSearchController.SubClassDialogNewMat) {
										// create dialog via fragment factory
										oSearchController.SubClassDialogNewMat = sap.ui.xmlfragment(oView.getId(),
											"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog", oSearchController.SubClassDialogNewMat);
										// connect dialog to view (models, lifecycle)
										oView.addDependent(oSearchController.SubClassDialogNewMat);
										oSearchController.SubClassDialogNewMat.attachConfirm(oSearchController.onSubClasshandleConfirm);
										oSearchController.SubClassDialogNewMat.attachCancel(oSearchController.onSubClasshandleClose);
									}
									oSearchController.SubClassDialogNewMat.open();

								} else {
									// if (oControllerObjReqNewMat.ClassificationTreeJSON.results > 0) {
									sap.m.MessageBox
										.error(" You already have selected Sub Class");
								}
							},
						})
					]
				})
			]
		}));
	},
	z_app_spare_parts.z_spare_parts1.util.SubClassContent.clearClassificationTreeReqNewMat = function (oControllerObjReqNewMat) {
		debugger;
		oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
		oControllerObjReqNewMat.ClassificationTreeJSON = {
			results: []
		};
		var ClassificationTree = oControllerObjReqNewMat.getView().byId("idIconTabBarRequestNewMaterial")
		ClassificationTree.destroyItems();
		var HBox = new sap.m.HBox({
			justifyContent: "End",
			items: [
				new sap.m.Label({
					text: "TEST_OEM_NUM",
					design: "Bold",
				}).addStyleClass("oDynamicLabelPadding"),
				new sap.m.Input({
					placeholder: "Type New Char Value",
					value: "",
					//commented by udit to correct width
					/*width: "auto"*/
						width: "180px",
						// id:"idoempartNumber_value_ReqNewMat",
				})
			]
		});
		var GridIconTabContent = new sap.ui.layout.Grid({
			defaultSpan: "XL6 L6 M6 S6",
			content: [HBox]
		});
		ClassificationTree.addItem(new sap.m.IconTabFilter({
			visible: true,
			key: 0,
			icon: "sap-icon://hint",
			text: HeaderClass,
			content: [
				GridIconTabContent,
				new sap.m.Bar({
					contentRight: [
						new sap.m.Button({
							text: "Select Sub Class",
							type: "Emphasized",
							press: function (oEvent) {
								debugger;
								if (!oControllerObjReqNewMat.ClassificationTreeJSON) {
									oControllerObjReqNewMat.ClassificationTreeJSON = {
										results: []
									};
									// var oSubClass = "SP_GIMM";
									var ClassificationTree = "";
									var previousIndex = "";
									z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTree(HeaderClass, oControllerObjReqNewMat,
										ClassificationTree, previousIndex);
									var oView = oControllerObjReqNewMat.getView();

									oControllerObjReqNewMat.SubClassDialogNewMat = oView.byId("SubClassDialogid");
									if (!oControllerObjReqNewMat.SubClassDialogNewMat) {
										// create dialog via fragment factory
										oControllerObjReqNewMat.SubClassDialogNewMat = sap.ui.xmlfragment(oView.getId(),
											"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog", oSearchController.SubClassDialogNewMat);
										// connect dialog to view (models, lifecycle)
										oView.addDependent(oControllerObjReqNewMat.SubClassDialogNewMat);
										oControllerObjReqNewMat.SubClassDialogNewMat.attachConfirm(oControllerObjReqNewMat.onSubClasshandleConfirm);
										oControllerObjReqNewMat.SubClassDialogNewMat.attachCancel(oControllerObjReqNewMat.onSubClasshandleClose);
									}
									oControllerObjReqNewMat.SubClassDialogNewMat.open();
								} else if (oControllerObjReqNewMat.ClassificationTreeJSON.results.length == 0 || oControllerObjReqNewMat.ClassificationTreeJSON
									.results
									.length == 1) {

									oControllerObjReqNewMat.ClassificationTreeJSON = {
										results: []
									};
									// var oSubClass = "SP_GIMM";
									var ClassificationTree = "";
									var previousIndex = "";
									z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTree(HeaderClass, oControllerObjReqNewMat,
										ClassificationTree, previousIndex);
									var oView = oControllerObjReqNewMat.getView();

									oControllerObjReqNewMat.SubClassDialogNewMat = oView.byId("SubClassDialogid");
									if (!oControllerObjReqNewMat.SubClassDialogNewMat) {
										// create dialog via fragment factory
										oControllerObjReqNewMat.SubClassDialogNewMat = sap.ui.xmlfragment(oView.getId(),
											"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog", oSearchController.SubClassDialogNewMat);
										// connect dialog to view (models, lifecycle)
										oView.addDependent(oControllerObjReqNewMat.SubClassDialogNewMat);
										oControllerObjReqNewMat.SubClassDialogNewMat.attachConfirm(oControllerObjReqNewMat.onSubClasshandleConfirm);
										oControllerObjReqNewMat.SubClassDialogNewMat.attachCancel(oControllerObjReqNewMat.onSubClasshandleClose);
									}
									oControllerObjReqNewMat.SubClassDialogNewMat.open();

								} else {
									// if (oControllerObjReqNewMat.ClassificationTreeJSON.results > 0) {
									sap.m.MessageBox
										.error(" You already have selected Sub Class");
								}
							},
						})
					]
				})
			]
		}));
	},
	z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadReqNewMatJSONClassificationTreeFromSearch = function (that) {
		debugger;
		//	busyDialog.open();
		debugger;

		var ClassificationTree = that.getView().byId("idIconTabBarRequestNewMaterial");
		// var resultsIcontab =  that.ClassificationTreeJSON.results[0].ET_CLASS_HEADERNav.results;
		debugger;
// code added by Udit for star in first and second vendor and part in PUR for Search by classification when No data found
		if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
				{
				that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(false);
				that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(false);
												
				that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(true);
				that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(true);
				}else{
					that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(true);
				that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(true);
												
				that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(false);
				that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(false);
				}
// end************************************

		for (var k = 0; k < that.ClassificationTreeJSON.results.length; k++) {

			var LeafNode = that.ClassificationTreeJSON.results[k].LEAF; //set leaf node
			var setVisibleNextButton;
			if (LeafNode == "X") {
				setVisibleNextButton = false;
			} else {
				setVisibleNextButton = true;
			}
			var oSubClass = that.ClassificationTreeJSON.results[k].Class;
			var HeaderBar = new sap.m.Bar({
				contentRight: [new sap.m.Button({
					text: "Back",
					type: sap.m.ButtonType.Reject,
					press: function (oEvent) {
						debugger;
						BtnNextForLeafDisable = oEvent.getSource().getParent().getParent().getContent()[2].getContentRight()[0];
						var copyoClassificationTreeJSON = that.ClassificationTreeJSON.results;
						var ClassificationTree = that.getView().byId("idIconTabBarRequestNewMaterial");
						var ClassTreeLen = ClassificationTree.getItems().length;
						// ClassTreeLen = ClassTreeLen;
						var SelectedIndex = oEvent.getSource().getParent().getParent().getParent().getSelectedKey();
						SelectedIndex = SelectedIndex - 1;
						if (SelectedIndex < ClassTreeLen) {
							for (var i = SelectedIndex; i < ClassTreeLen; i++) {
								copyoClassificationTreeJSON.splice(SelectedIndex, 1);
								ClassificationTree.getItems()[SelectedIndex].destroy();
							}
						}
						ClassificationTree = that.getView().byId("idIconTabBarRequestNewMaterial");
						ClassTreeLen = ClassificationTree.getItems().length;
						var previousIndex = ClassTreeLen - 1;
						var oSubClass = ClassificationTree.getItems()[previousIndex].getText();
						that.DuplicateFlag = "";
						that.getView().byId("idShortText_ReqNewMat").setText("");
						that.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
						that.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
						that.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
						z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTreeOnBack(oSubClass, that, ClassificationTree,
							previousIndex);
						debugger;
						// BtnNextForLeafDisable.setVisible(false);
					}
				})]
			});
			var FooterBar = new sap.m.Bar({
				contentRight: [new sap.m.Button({
					text: "Next",
					visible: setVisibleNextButton,
					type: sap.m.ButtonType.Emphasized,
					press: function (oEvent) {
						debugger;
						// if (!oControllerObjReqNewMat.ClassificationTreeJSON) {
						var oView = that.getView();
						that.oDynamicSubClassDialogCopyMat = oView.byId("SubClassDialogid");
						if (!that.oDynamicSubClassDialogCopyMat) {
							// create dialog via fragment factory
							that.oDynamicSubClassDialogCopyMat = sap.ui.xmlfragment(oView.getId(),
								"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
								this.oDynamicSubClassDialogCopyMat);
							// connect dialog to view (models, lifecycle)
							oView.addDependent(that.oDynamicSubClassDialogCopyMat);
							that.oDynamicSubClassDialogCopyMat.attachConfirm(that.onSubClasshandleConfirm);
							that.oDynamicSubClassDialogCopyMat.attachCancel(that.onSubClasshandleClose);
						}
						that.oDynamicSubClassDialogCopyMat.open();
						// } else {
						// 	sap.m.MessageBox
						// 		.error(" You have already selected Sub Class");
						// }
					}
				})],
			});
			var FlexBoxInfo = new sap.m.FlexBox({
				width: "100%",
				direction: sap.m.FlexDirection.Row,
				justifyContent: "End",
				items: [
					new sap.m.Label({
						required: true,
						text: ":"
					}).addStyleClass("paddingSplit"),
					new sap.m.Label({
						text: "MandatoryChar"
					}).addStyleClass("paddingSmall"),
					new sap.m.Label({
						text: "Bold Text:",
						design: "Bold"
					}).addStyleClass("paddingSplit"),
					new sap.m.Label({
						text: "ShortTxtRelChar"
					}).addStyleClass("paddingSmall"),
				]
			});

			var GridIconTabContent = new sap.ui.layout.Grid({
				defaultSpan: "XL6 L6 M6 S6",
				content: []
			});
			var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
			CharValueJsonModel.setData(that.ClassificationTreeJSON.results[k].ET_CLASS_CHARNav)
			for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
				var setDesign;
				var setRequired;
				var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
				if (shorttext == "X") {
					setDesign = sap.m.LabelDesign.Bold;
				} else {
					setDesign = sap.m.LabelDesign.Standard;
				}
				var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
				if (mandatory == "X") {
					setRequired = true;
				} else {
					setRequired = false;
				}
				var inputType = CharValueJsonModel.getData().results[a].DATATYP;
				if (inputType == "CHAR") {
					inputType = "Text"
				} else if (inputType == "NUM") {
					inputType = "Number"
				}
				
				var dropOnly = CharValueJsonModel.getData().results[a].DROPONLY;
				if(dropOnly == "X"){
						dropOnly = true
					}else{
						dropOnly = false
					}
				// added by Udit for search by classification - on click of search when it take to New Material screen so Part number will now don't show value help	
				var noHelp = CharValueJsonModel.getData().results[a].NOHELP;
					if(noHelp == "X"){
							noHelp = false;
					}
					else{
						noHelp = true;
					}
				
				var CHARLEN = parseInt(CharValueJsonModel.getData().results[a].CHARLEN);
				// var CHARLEN = (CharValueJsonModel.getData().results[a].CHARLEN);
				var HBox = new sap.m.HBox({
					// alignItems: "Stretch",
					justifyContent: "End",
					items: [
						new sap.m.Label({
							text: CharValueJsonModel.getData().results[a].DESC,
							design: setDesign,
							required: setRequired
						}).addStyleClass("oDynamicLabelPadding"),
						new sap.m.Input({
							placeholder: "Type New Char Value",
							value: CharValueJsonModel.getData().results[a].DEFVALUE,
								width: "180px",
							showValueHelp: noHelp,
							valueHelpOnly:dropOnly,
								enabled:true,
								editable:true,
							// maxLength: CHARLEN,
							// type:inputType,
							valueHelpRequest: function (oEventInput) {
								debugger;
								that.selectedInput = oEventInput.getSource();
								var currentChar = oEventInput.getSource().getParent().getItems()[0].getText();
								// that.ClassificationTreeJSON
								var IcontabText = oEventInput.getSource().getParent().getParent().getParent().getText();
								for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
									if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
										// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
										for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
												that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav
													.results[i].ET_CHAR_VALUENav);
											}
										}
									}
								}
								oControllerObjReqNewMat.DuplicateFlag = "";
								oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").setText("");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
								oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);

								var oView = that.getView();
								that.CharacteristicValueHelpDialogCopyMat = oView.byId("CharacteristicValueHelp");
								if (!that.CharacteristicValueHelpDialogCopyMat) {
									// create dialog via fragment factory
									that.CharacteristicValueHelpDialogCopyMat = sap.ui.xmlfragment(oView.getId(),
										"z_app_spare_parts.z_spare_parts1.fragments.CharacteristicValueHelp",
										that.CharacteristicValueHelpDialogCopyMat);
									// connect dialog to view (models, lifecycle)
									oView.addDependent(that.CharacteristicValueHelpDialogCopyMat);
									// that.CharacteristicValueHelpDialogCopyMat.attachSearch(that.onSubClasshandleConfirm);
									// this.oDialog2.attachCancel(this.onhandleClose);
									that.CharacteristicValueHelpDialogCopyMat.attachConfirm(function (oEvent) {
										debugger;
										var searchValue = "";
										var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
										// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
										var oBinding = oEvent.getSource().getBinding("items");
										var filters = new Array();
										filters.push(filterVALUE);
										// filters.push(filterPCNDesc);
										oBinding.filter(new sap.ui.model.Filter(filters, false));
										var sSelectedValue = oEvent.getParameters().selectedItem.getBindingContext("CharacteristicValueHelpJsonModel").getObject()
											.VALUE;
										that.selectedInput.setValue(sSelectedValue);

										var currentChar = that.selectedInput.getParent().getItems()[0].getText();
										// that.ClassificationTreeJSON
										var IcontabText = that.selectedInput.getParent().getParent().getParent().getText();
										for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
											if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
												// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
												for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
													if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "";
													}
												}
											}
										}
										
										
										
										
										
										//START by UDit partnumber values will get change according to yes or no
											for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
												if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
													// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
													for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
													
														// added by Udit
							/*if(that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[2].DEFVALUE=="Yes")*/
							if(currentChar=="Partnumber = OEM Partnumber"){
							if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								/*var selectedPartNumber = that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;*/
								var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(selectedPartNumber);
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
								
								that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(false);
								that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(false);
								
								that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(true);
								that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(true);
		

							}
							else if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart2=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(selectedPartNumber);
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue("");
								
								that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(false);
								that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(false);
								
									that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(true);
								that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(true);
							}
							}else if(currentChar=="PARTNUMBER" ){
									if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
						
								var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(selectedPartNumber);
							}
							else if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No")
							{
							
								var selectedPartNumber = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(selectedPartNumber);
							}
							}
							
							// till here
													
													
													
													
													
													
													
													
													/*	if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
															var oViewID = that.getView().sId;
															var ClassificationTree;
														

															that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
															that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "";
														}*/
													}
												}
											}
											
										//END
										
											//start udit to remove the red error state of input and icon Tab
							var iconTabBar = that.byId("idIconTabBarRequestNewMaterial");
							var classTreeJSON = that.ClassificationTreeJSON.results;
							for (var t = 0; t < classTreeJSON.length; t++) {
								for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
								
									if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
									/*	if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE) {*/
										if (sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar) {
											iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
											iconTabBar.getItems()[t].setIconColor("Neutral");
									/*	}else if(!classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE){*/
										}else if(!sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
												iconTabBar.getItems()[t].setIconColor("Negative");
										}
									}
								}
							}
								//end
								
								
									});
									that.CharacteristicValueHelpDialogCopyMat.attachSearch(function (oEvent) {
										debugger;
										var searchValue = oEvent.getParameter('value');
										var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
										// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
										var oBinding = oEvent.getSource().getBinding("items");
										var filters = new Array();
										filters.push(filterVALUE);
										// filters.push(filterPCNDesc);
										oBinding.filter(new sap.ui.model.Filter(filters, false));
									});
								}
								that.CharacteristicValueHelpDialogCopyMat.open();
							},
							liveChange: function (oEvent) {
								debugger;

								var sSelectedValue = oEvent.getSource().getValue();
								var currentChar = oEvent.getSource().getParent().getItems()[0].getText();
								var IcontabText = oEvent.getSource().getParent().getParent().getParent().getText();
								for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
								// to correct value state in search by Classification By Udit Kandh
							/*	if(sSelectedValue!="")
								{
									
								}*/
								
								//START NOW FOR SEARCH BY CLASSIFICATION Vendor 1 value will get changed on live change of part number
									// added by Udit
						
							if(currentChar== "PARTNUMBER" && that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
								that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(sSelectedValue);
							}
							else if(currentChar== "PARTNUMBER" && that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No")
							{
								that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(sSelectedValue);
							}
							// till here
								//END
									if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
										// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
										for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
												that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
												that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "X";
											}
										}
									}
								}
								
									//start udit to remove the red error state of input and icon Tab
									var oViewID = that.getView().sId;
//	var iconTabBar;
	if (oViewID.search("newmaterial") > -1) {
							var iconTabBar = that.byId("idIconTabBarRequestNewMaterial");
							var classTreeJSON = that.ClassificationTreeJSON.results;
							for (var t = 0; t < classTreeJSON.length; t++) {
								for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
								
									if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
									
										if (sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar) {
											iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
											iconTabBar.getItems()[t].setIconColor("Neutral");
									
										}else if(!sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
												iconTabBar.getItems()[t].setIconColor("Negative");
										}
									}
								}
							}
	}
								//end
								
									//value state Udit Kandh
								/*	var oViewID = that.getView().sId;
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
			}
		}
	} else if (oViewID.search("requestCopyMaterial") > -1) {
		iconTabBar = that.byId("idIconTabBarRequestCopyMaterial");
		var classTreeJSON = that.ClassificationTreeJSON.results;
		for (var t = 0; t < classTreeJSON.length; t++) {
			for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
				if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
					if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].DEFVALUE == "") {
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
						iconTabBar.getItems()[t].setIconColor("Negative");
						z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(false);					}
					
					else {
						iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
						iconTabBar.getItems()[t].setIconColor("Neutral");
					
					}
				}
			}
		}
	}*/
									//*********************************************value state end
								
								oControllerObjReqNewMat.DuplicateFlag = "";
								oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").setText("");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
								oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
								oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
							}
						})
					]
				});
				GridIconTabContent.addContent(HBox);
			}
			var keyIndex = parseInt(k) + 1;
			ClassificationTree.addItem(new sap.m.IconTabFilter({
				visible: true,
				key: keyIndex,
				icon: "sap-icon://hint",
				text: oSubClass,
				content: [
					HeaderBar,
					// FormForIconTabContent,
					GridIconTabContent,
					FooterBar,
					FlexBoxInfo
				]
			}));
			var setSelectedIndex = k.toString();
			ClassificationTree.setSelectedKey(keyIndex);
		}

		if (ClassificationTree.getItems()[0].getContent()[1].getContent()[0].getItems()[0].getText() == "PARTNUMBER") {
			that.setNoOEMFLAG = "";
			var partnumberVal = ClassificationTree.getItems()[0].getContent()[1].getContent()[0].getItems()[1].getValue();
			that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
			that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(partnumberVal);
		}

		// },
		// function (oError) {
		// 	debugger;
		// 	sap.m.MessageBox
		// 		.error(" Data fetch failed");
		// });
		//	busyDialog.close();
	};

z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadCopyMatJSONClassificationTree = function (that) {
	debugger;
	//	busyDialog.open();
	that.getOwnerComponent().getModel("SubClassJsonModel").setData(""); //json for sub class
	var oRequestCopyMaterialModelData = that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData(); //complete json
	// that.getOwnerComponent().getModel("CharValueJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
	// that.getOwnerComponent().getModel("SubClassJsonModel").setData(oData.results[0].ET_SUB_CLASSNav); //json for sub class
	// that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
	for (var t = 0; t < oRequestCopyMaterialModelData.results[0].ET_CLASS_HEADERNav.results.length; t++) {
		that.ClassificationTreeJSON.results.push(oRequestCopyMaterialModelData.results[0].ET_CLASS_HEADERNav.results[t]);
	}
	
	
	

	var ClassificationTree = that.getView().byId("idIconTabBarRequestCopyMaterial");
	for (var k = 0; k < that.ClassificationTreeJSON.results.length; k++) {

		var PARTNUMBER = that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
		that.setNoOEMFLAG = "";
		
		// change by Udit

		if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[2].DEFVALUE == "Yes"){
			that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue(PARTNUMBER);
			/*that.getView().byId("idinputsecondvendor_label_ReqCopyMat").setRequired("false");
			that.getView().byId("idinputoempartsecond_label_ReqCopyMat").setRequired("false");*/
			
		}else{
			that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue(PARTNUMBER);
			
			/*that.getView().byId("idinputoempartfirst_label_ReqCopyMat").setRequired("false");
			that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").setRequired("false");*/
		}
		
		/*that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue(PARTNUMBER);*/

		var LeafNode = that.ClassificationTreeJSON.results[k].LEAF; //set leaf node
		var setVisibleNextButton;
		if (LeafNode == "X") {
			setVisibleNextButton = false;
		} else {
			setVisibleNextButton = true;
		}
		var oSubClass = that.ClassificationTreeJSON.results[k].Class;
		var HeaderBar = new sap.m.Bar({
			contentRight: [new sap.m.Button({
				text: "Back",
				type: sap.m.ButtonType.Reject,
				press: function (oEvent) {
					debugger;
					BtnNextForLeafDisable = oEvent.getSource().getParent().getParent().getContent()[2].getContentRight()[0];
					var copyoClassificationTreeJSON = that.ClassificationTreeJSON.results;
					var ClassificationTree = that.getView().byId("idIconTabBarRequestCopyMaterial");
					var ClassTreeLen = ClassificationTree.getItems().length;
					// ClassTreeLen = ClassTreeLen;
					var SelectedIndex = oEvent.getSource().getParent().getParent().getParent().getSelectedKey();
					SelectedIndex = SelectedIndex - 1;
					if (SelectedIndex < ClassTreeLen) {
						for (var i = SelectedIndex; i < ClassTreeLen; i++) {
							copyoClassificationTreeJSON.splice(SelectedIndex, 1);
							ClassificationTree.getItems()[SelectedIndex].destroy();
						}
					}
					ClassificationTree = that.getView().byId("idIconTabBarRequestCopyMaterial");
					ClassTreeLen = ClassificationTree.getItems().length;
					var previousIndex = ClassTreeLen - 1;
					var oSubClass = ClassificationTree.getItems()[previousIndex].getText();
					that.DuplicateFlag = "";
					that.getView().byId("idShortText_ReqCopyMat").setText("");
					that.getView().byId("idValidateClassBtn_ReqCopyMat").setText("Validate Classification Information");
					that.getView().byId("idValidateClassBtn_ReqCopyMat").setType("Emphasized");
					that.getView().byId("idReviewBtn_ReqCopyMat").setEnabled(false);
					z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTreeOnBack(oSubClass, that, ClassificationTree,
						previousIndex);
					debugger;
				}
			})]
		});
		var FooterBar = new sap.m.Bar({
			contentRight: [new sap.m.Button({
				text: "Next",
				visible: setVisibleNextButton,
				type: sap.m.ButtonType.Emphasized,
				press: function (oEvent) {
					debugger;
					// if (!oControllerObjReqCopyMat.ClassificationTreeJSON) {
					var oView = that.getView();
					that.oDynamicSubClassDialogCopyMat = oView.byId("SubClassDialogid");
					if (!that.oDynamicSubClassDialogCopyMat) {
						// create dialog via fragment factory
						that.oDynamicSubClassDialogCopyMat = sap.ui.xmlfragment(oView.getId(),
							"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
							this.oDynamicSubClassDialogCopyMat);
						// connect dialog to view (models, lifecycle)
						oView.addDependent(that.oDynamicSubClassDialogCopyMat);
						that.oDynamicSubClassDialogCopyMat.attachConfirm(that.onSubClasshandleConfirm);
						that.oDynamicSubClassDialogCopyMat.attachCancel(that.onSubClasshandleClose);
					}
					that.oDynamicSubClassDialogCopyMat.open();
					// } else {
					// 	sap.m.MessageBox
					// 		.error(" You have already selected Sub Class");
					// }
				}
			})],
		});
		var FlexBoxInfo = new sap.m.FlexBox({
			width: "100%",
			direction: sap.m.FlexDirection.Row,
			justifyContent: "End",
			items: [
				new sap.m.Label({
					required: true,
					text: ":"
				}).addStyleClass("paddingSplit"),
				new sap.m.Label({
					text: "MandatoryChar"
				}).addStyleClass("paddingSmall"),
				new sap.m.Label({
					text: "Bold Text:",
					design: "Bold"
				}).addStyleClass("paddingSplit"),
				new sap.m.Label({
					text: "ShortTxtRelChar"
				}).addStyleClass("paddingSmall"),
			]
		});

		var GridIconTabContent = new sap.ui.layout.Grid({
			defaultSpan: "XL6 L6 M6 S6",
			content: []
		});
		var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
		CharValueJsonModel.setData(that.ClassificationTreeJSON.results[k].ET_CLASS_CHARNav)
		for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
			var setDesign;
			var setRequired;
			var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
			if (shorttext == "X") {
				setDesign = sap.m.LabelDesign.Bold;
			} else {
				setDesign = sap.m.LabelDesign.Standard;
			}
			var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
			if (mandatory == "X") {
				setRequired = true;
			} else {
				setRequired = false;
			}
			var inputType = CharValueJsonModel.getData().results[a].DATATYP;
			if (inputType == "CHAR") {
				inputType = "Text"
			} else if (inputType == "NUM") {
				inputType = "Number"
			}
			
			var dropOnly = CharValueJsonModel.getData().results[a].DROPONLY;
			var noHelp = CharValueJsonModel.getData().results[a].NOHELP;
			
			if(dropOnly == "X"){
						dropOnly = true
						noHelp = true
					}else{
						dropOnly = false
						
						if(noHelp == "X"){
							noHelp = false
						}
						else{
							noHelp = true
							
						}
					}
			
			var CHARLEN = parseInt(CharValueJsonModel.getData().results[a].CHARLEN);
			var HBox = new sap.m.HBox({
				// alignItems: "Stretch",
				justifyContent: "End",
				items: [
					new sap.m.Label({
						text: CharValueJsonModel.getData().results[a].DESC,
						design: setDesign,
						required: setRequired
					}).addStyleClass("oDynamicLabelPadding"),
					new sap.m.Input({
						placeholder: "Type New Char Value",
						value: CharValueJsonModel.getData().results[a].DEFVALUE,
							width: "180px",
						showValueHelp: noHelp,
						valueHelpOnly:dropOnly,
								enabled:true,
								editable:true,
						// maxLength: CHARLEN,
						// type:inputType,
						valueHelpRequest: function (oEventInput) {
							debugger;
							that.selectedInput = oEventInput.getSource();
							var currentChar = oEventInput.getSource().getParent().getItems()[0].getText();
							that.ClassificationTreeJSON
							var IcontabText = oEventInput.getSource().getParent().getParent().getParent().getText();
							
							for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
								if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
									// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
									for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
										if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
											that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav
												.results[i].ET_CHAR_VALUENav);
										}
									}
								}
							}
							oControllerObjReqCopyMat.DuplicateFlag = "";
							oControllerObjReqCopyMat.getView().byId("idShortText_ReqCopyMat").setText("");
							oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setText("Validate Classification Information");
							oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setType("Emphasized");
							oControllerObjReqCopyMat.getView().byId("idReviewBtn_ReqCopyMat").setEnabled(false);

							var oView = that.getView();
							that.CharacteristicValueHelpDialogCopyMat = oView.byId("CharacteristicValueHelp");
							if (!that.CharacteristicValueHelpDialogCopyMat) {
								// create dialog via fragment factory
								that.CharacteristicValueHelpDialogCopyMat = sap.ui.xmlfragment(oView.getId(),
									"z_app_spare_parts.z_spare_parts1.fragments.CharacteristicValueHelp",
									that.CharacteristicValueHelpDialogCopyMat);
								// connect dialog to view (models, lifecycle)
								oView.addDependent(that.CharacteristicValueHelpDialogCopyMat);
								// that.CharacteristicValueHelpDialogCopyMat.attachSearch(that.onSubClasshandleConfirm);
								// this.oDialog2.attachCancel(this.onhandleClose);
								that.CharacteristicValueHelpDialogCopyMat.attachConfirm(function (oEvent) {
									debugger;
									var searchValue = "";
									var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
									// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
									var oBinding = oEvent.getSource().getBinding("items");
									var filters = new Array();
									filters.push(filterVALUE);
									// filters.push(filterPCNDesc);
									oBinding.filter(new sap.ui.model.Filter(filters, false));
									var sSelectedValue = oEvent.getParameters().selectedItem.getBindingContext("CharacteristicValueHelpJsonModel").getObject()
										.VALUE;
									that.selectedInput.setValue(sSelectedValue);

									var currentChar = that.selectedInput.getParent().getItems()[0].getText();
									// that.ClassificationTreeJSON
									var IcontabText = that.selectedInput.getParent().getParent().getParent().getText();
									
								/*start changes for value state*/
											var	iconTabBar = that.byId("idIconTabBarRequestCopyMaterial");
											var classTreeJSON = that.ClassificationTreeJSON.results;
											for (var t = 0; t < classTreeJSON.length; t++) {
												for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
				
												if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
													if (!sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar) {
														iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
														iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
														iconTabBar.getItems()[t].setIconColor("Negative");
													}
					
													else if(sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
												iconTabBar.getItems()[t].setIconColor("Neutral");
												// z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
											}
										}
						
										
								
						
									}
									
								}
								/*end*/
							
									
									for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
										if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
											// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
											for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											
											
												// added by Udit
							/*if(that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[2].DEFVALUE=="Yes")*/
							/*if(currentChar=="PARTNUMBER" || currentChar=="Partnumber = OEM Partnumber"){*/
								if(currentChar=="Partnumber = OEM Partnumber"){
							if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE);
								that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue("");
								
								that.getView().byId("idinputsecondvendor_label_ReqCopyMat").setRequired(false);
								that.getView().byId("idinputoempartsecond_label_ReqCopyMat").setRequired(false);
								
								that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").setRequired(true);
								that.getView().byId("idinputoempartfirst_label_ReqCopyMat").setRequired(true);
		

							}
							else if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No"){
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart2=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE);
								that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue("");
								
								that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").setRequired(false);
								that.getView().byId("idinputoempartfirst_label_ReqCopyMat").setRequired(false);
								
									that.getView().byId("idinputsecondvendor_label_ReqCopyMat").setRequired(true);
								that.getView().byId("idinputoempartsecond_label_ReqCopyMat").setRequired(true);
							}
							}else if(currentChar=="PARTNUMBER" ){
								if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE);
							}
							else if(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No"){
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart2=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE);
							}
							}
							// till here
											
											
											
											
												if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
													that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
													that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "";

													/*if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == "PARTNUMBER" || that.ClassificationTreeJSON
														.results[b].ET_CLASS_CHARNav.results[i].NAME == "PN") {
														if (oControllerObjReqCopyMat.getView().byId("idBtnNoOemAvailable_ReqCopyMat").getSelected() == true) {
															that.setNoOEMFLAG = "X";
															that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue(sSelectedValue);
															that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue("");
														} else {
															that.setNoOEMFLAG = "";
															that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue("");
															that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue(sSelectedValue);
														}
													}*/
												}
											}
										}
									}
								});
								that.CharacteristicValueHelpDialogCopyMat.attachSearch(function (oEvent) {
									debugger;
									var searchValue = oEvent.getParameter('value');
									var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
									// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
									var oBinding = oEvent.getSource().getBinding("items");
									var filters = new Array();
									filters.push(filterVALUE);
									// filters.push(filterPCNDesc);
									oBinding.filter(new sap.ui.model.Filter(filters, false));
								});
							}
							that.CharacteristicValueHelpDialogCopyMat.open();
						},
						liveChange: function (oEvent) {
							debugger;

							var sSelectedValue = oEvent.getSource().getValue();
							var currentChar = oEvent.getSource().getParent().getItems()[0].getText();
							var IcontabText = oEvent.getSource().getParent().getParent().getParent().getText();
							for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
								if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
									// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
									for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
									
										// added by Udit
							/*if(that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[2].DEFVALUE=="Yes")*/
							if(currentChar== "PARTNUMBER" && that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE);
							/*	that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue("");
								
								that.getView().byId("idinputsecondvendor_label_ReqCopyMat").setRequired(false);
								that.getView().byId("idinputoempartsecond_label_ReqCopyMat").setRequired(false);
								
								that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").setRequired(true);
								that.getView().byId("idinputoempartfirst_label_ReqCopyMat").setRequired(true);*/
		

							}
							else if(currentChar== "PARTNUMBER" && that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No"){
							//	that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].OemPart2=that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0].ET_CLASS_HEADERNav.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
								that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue(that.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE);
							/*	that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue("");
								
								that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").setRequired(false);
								that.getView().byId("idinputoempartfirst_label_ReqCopyMat").setRequired(false);
								
									that.getView().byId("idinputsecondvendor_label_ReqCopyMat").setRequired(true);
								that.getView().byId("idinputoempartsecond_label_ReqCopyMat").setRequired(true);*/
							}
							// till here
									
									
										if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
											that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
											that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "X";

											/*	if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == "PARTNUMBER" || that.ClassificationTreeJSON
													.results[b].ET_CLASS_CHARNav.results[i].NAME == "PN") {
													if (oControllerObjReqCopyMat.getView().byId("idBtnNoOemAvailable_ReqCopyMat").getSelected() == true) {
														that.setNoOEMFLAG = "X";
														that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue(sSelectedValue);
														that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue("");
													} else {
														that.setNoOEMFLAG = "";
														that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue("");
														that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue(sSelectedValue);
													}
												}*/
										}
									}
								}
							}
							
								/*start changes for value state*/
											var	iconTabBar = that.byId("idIconTabBarRequestCopyMaterial");
											var classTreeJSON = that.ClassificationTreeJSON.results;
											for (var t = 0; t < classTreeJSON.length; t++) {
												for (var u = 0; u < classTreeJSON[t].ET_CLASS_CHARNav.results.length; u++) {
				
												if (classTreeJSON[t].ET_CLASS_CHARNav.results[u].MANDATORY == "X") {
													if (!sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar) {
														iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("Error");
														iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueStateText("Enter Correct value");
														iconTabBar.getItems()[t].setIconColor("Negative");
													}
					
													else if(sSelectedValue && classTreeJSON[t].ET_CLASS_CHARNav.results[u].DESC==currentChar){
												iconTabBar.getItems()[t].getContent()[1].getContent()[u].getItems()[1].setValueState("None");
												iconTabBar.getItems()[t].setIconColor("Neutral");
												// z_app_spare_parts.z_spare_parts1.util.SearchByClassification.setValidateFlag(true);
											}
										}
						
										
								
						
									}
									
								}
								/*end*/
							
							oControllerObjReqCopyMat.DuplicateFlag = "";
							oControllerObjReqCopyMat.getView().byId("idShortText_ReqCopyMat").setText("");
							oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setText("Validate Classification Information");
							oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setType("Emphasized");
							oControllerObjReqCopyMat.getView().byId("idReviewBtn_ReqCopyMat").setEnabled(false);
						}
					})
				]
			});
			GridIconTabContent.addContent(HBox);
		}
		var keyIndex = parseInt(k) + 1;
		ClassificationTree.addItem(new sap.m.IconTabFilter({
			visible: true,
			key: keyIndex,
			icon: "sap-icon://hint",
			text: oSubClass,
			content: [
				HeaderBar,
				// FormForIconTabContent,
				GridIconTabContent,
				FooterBar,
				FlexBoxInfo
			]
		}));
		var setSelectedIndex = keyIndex.toString();
		ClassificationTree.setSelectedKey(setSelectedIndex);
	}
	// },
	// function (oError) {
	// 	debugger;
	// 	sap.m.MessageBox
	// 		.error(" Data fetch failed");
	// });
	//	busyDialog.close();
};
z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadReviewReqCopyMatJSONClassificationTree = function (oControllerObjReqCopyMat,
	oControllerObjReviewReqCopyMat) {
	debugger;

	var ClassificationTree = oControllerObjReviewReqCopyMat.getView().byId("idIconTabBarReviewRequestCopyMaterial");
	
	// added by Udit FOR REMOVING STAR
							  
							if(oControllerObjReqCopyMat.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="Yes")
							{
								oControllerObjReviewReqCopyMat.getView().byId("idinputsecondvendor_label_ReviewReqCopyMat").setRequired(false);
								oControllerObjReviewReqCopyMat.getView().byId("idinputoempartsecond_label_ReviewReqCopyMat").setRequired(false);
								
								oControllerObjReviewReqCopyMat.getView().byId("idinputfirstoemvendor_label_ReviewReqCopyMat").setRequired(true);
								oControllerObjReviewReqCopyMat.getView().byId("idinputoempartfirst_label_ReviewReqCopyMat").setRequired(true);
		

							}
							else if(oControllerObjReqCopyMat.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[1].DEFVALUE=="No")
							{
								oControllerObjReviewReqCopyMat.getView().byId("idinputfirstoemvendor_label_ReviewReqCopyMat").setRequired(false);
								oControllerObjReviewReqCopyMat.getView().byId("idinputoempartfirst_label_ReviewReqCopyMat").setRequired(false);
								
								oControllerObjReviewReqCopyMat.getView().byId("idinputsecondvendor_label_ReviewReqCopyMat").setRequired(true);
								oControllerObjReviewReqCopyMat.getView().byId("idinputoempartsecond_label_ReviewReqCopyMat").setRequired(true);
							}
							// till here

	for (var k = 0; k < oControllerObjReqCopyMat.ClassificationTreeJSON.results.length; k++) {

		var FlexBoxInfo = new sap.m.FlexBox({
			width: "100%",
			direction: sap.m.FlexDirection.Row,
			justifyContent: "End",
			items: [
				new sap.m.Label({
					required: true,
					text: ":"
				}).addStyleClass("paddingSplit"),
				new sap.m.Label({
					text: "MandatoryChar"
				}).addStyleClass("paddingSmall"),
				new sap.m.Label({
					text: "Bold Text:",
					design: "Bold"
				}).addStyleClass("paddingSplit"),
				new sap.m.Label({
					text: "ShortTxtRelChar"
				}).addStyleClass("paddingSmall"),
			]
		});

		var GridIconTabContent = new sap.ui.layout.Grid({
			defaultSpan: "XL6 L6 M6 S6",
			content: []
		});
		var CharValueJsonModel = oControllerObjReqCopyMat.getOwnerComponent().getModel("CharValueJsonModel");
		CharValueJsonModel.setData(oControllerObjReqCopyMat.ClassificationTreeJSON.results[k].ET_CLASS_CHARNav);
		for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
			var setDesign;
			var setRequired;
			var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
			if (shorttext == "X") {
				setDesign = sap.m.LabelDesign.Bold;
			} else {
				setDesign = sap.m.LabelDesign.Standard;
			}
			var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
			if (mandatory == "X") {
				setRequired = true;
			} else {
				setRequired = false;
			}

			var HBox = new sap.m.HBox({
				// alignItems: "Stretch",
				justifyContent: "End",
				items: [
					new sap.m.Label({
						text: CharValueJsonModel.getData().results[a].DESC,
						design: setDesign,
						required: setRequired
					}).addStyleClass("oDynamicLabelPadding"),
					new sap.m.Text({
						text: CharValueJsonModel.getData().results[a].DEFVALUE,
					}).addStyleClass("paddingforTextClassTree"),
				]
			});
			GridIconTabContent.addContent(HBox);
		}
		var oSubClass = oControllerObjReqCopyMat.ClassificationTreeJSON.results[k].Class;
		var keyIndex = parseInt(k) + 1;
		ClassificationTree.addItem(new sap.m.IconTabFilter({
			visible: true,
			key: keyIndex,
			icon: "sap-icon://hint",
			text: oSubClass,
			content: [
				// HeaderBar,
				// FormForIconTabContent,
				GridIconTabContent,
				// FooterBar,
				FlexBoxInfo
			]
		}));
		var setSelectedIndex = keyIndex.toString();
		ClassificationTree.setSelectedKey(setSelectedIndex);
	}
	// },
	// function (oError) {
	// 	debugger;
	// 	sap.m.MessageBox
	// 		.error(" Data fetch failed");
	// });
	//	busyDialog.close();
};
z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSON_Content_ClassificationTree_CopyMat_Next = function (oSubClass, that) {
	debugger;
	//	busyDialog.open();
	var oDataModel = that.getOwnerComponent().getModel("oDataModelSP");
	oDataModel.read("/ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + oSubClass +
		"' and PCN eq '" + window.selectedpcn + "'", null, null, true,
		function (oData, oResponse) {
			debugger;

			that.getOwnerComponent().getModel("oClassJsonModel").setData(oData); //temp json
			that.getOwnerComponent().getModel("CharValueJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
			that.getOwnerComponent().getModel("SubClassJsonModel").setData(oData.results[0].ET_SUB_CLASSNav); //json for sub class
			that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(oData.results[0].ET_CLASS_CHARNav); //json for char value dialog
			that.ClassificationTreeJSON.results.push(oData.results[0]);
			var LeafNode = oData.results[0].LEAF; //set leaf node
			var setVisibleNextButton;
			if (LeafNode == "X") {
				setVisibleNextButton = false;
			} else {
				setVisibleNextButton = true;
			}
			// code to fill content of header bar, content of icon tab and footer bar
			var ClassificationTree = that.getView().byId("idIconTabBarRequestCopyMaterial");
			var keyIndex = ClassificationTree.getItems().length;
			keyIndex = parseInt(keyIndex) + 1;
			var HeaderBar = new sap.m.Bar({
				contentRight: [new sap.m.Button({
					text: "Back",
					type: sap.m.ButtonType.Reject,
					press: function (oEvent) {
						debugger;
						BtnNextForLeafDisable = oEvent.getSource().getParent().getParent().getContent()[2].getContentRight()[0];
						var copyoClassificationTreeJSON = that.ClassificationTreeJSON.results;
						var ClassificationTree = that.getView().byId("idIconTabBarRequestCopyMaterial");
						var ClassTreeLen = ClassificationTree.getItems().length;
						var SelectedIndex = oEvent.getSource().getParent().getParent().getParent().getSelectedKey();
						SelectedIndex = SelectedIndex - 1;
						if (SelectedIndex < ClassTreeLen) {
							for (var i = SelectedIndex; i < ClassTreeLen; i++) {
								copyoClassificationTreeJSON.splice(SelectedIndex, 1);
								ClassificationTree.getItems()[SelectedIndex].destroy();
							}
						}
						ClassificationTree = that.getView().byId("idIconTabBarRequestCopyMaterial");
						ClassTreeLen = ClassificationTree.getItems().length;
						var previousIndex = ClassTreeLen - 1;
						var oSubClass = ClassificationTree.getItems()[previousIndex].getText();
						that.DuplicateFlag = "";
						that.getView().byId("idShortText_ReqCopyMat").setText("");
						that.getView().byId("idValidateClassBtn_ReqCopyMat").setText("Validate Classification Information");
						that.getView().byId("idValidateClassBtn_ReqCopyMat").setType("Emphasized");
						that.getView().byId("idReviewBtn_ReqCopyMat").setEnabled(false);
						z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadJSONClassificationTreeOnBack(oSubClass, that, ClassificationTree,
							previousIndex);
						debugger;
						// BtnNextForLeafDisable= oEvent.getSource().getParent().getParent().getContent()[2].getContentRight();
					}
				})]
			});
			var FooterBar = new sap.m.Bar({
				contentRight: [new sap.m.Button({
					text: "Next",
					visible: setVisibleNextButton,
					type: sap.m.ButtonType.Emphasized,
					press: function (oEvent) {
						debugger;
						// if (!oControllerObjReqCopyMat.ClassificationTreeJSON) {
						var oView = that.getView();
						that.oDynamicSubClassDialogCopyMat = oView.byId("SubClassDialogid");
						if (!that.oDynamicSubClassDialogCopyMat) {
							// create dialog via fragment factory
							that.oDynamicSubClassDialogCopyMat = sap.ui.xmlfragment(oView.getId(),
								"z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
								this.oDynamicSubClassDialogCopyMat);
							// connect dialog to view (models, lifecycle)
							oView.addDependent(that.oDynamicSubClassDialogCopyMat);
							that.oDynamicSubClassDialogCopyMat.attachConfirm(that.onSubClasshandleConfirm);
							that.oDynamicSubClassDialogCopyMat.attachCancel(that.onSubClasshandleClose);
						}
						that.oDynamicSubClassDialogCopyMat.open();
						// } else {
						// 	sap.m.MessageBox
						// 		.error(" You have already selected Sub Class");
						// }
					}
				})],
			});
			var FlexBoxInfo = new sap.m.FlexBox({
				width: "100%",
				direction: sap.m.FlexDirection.Row,
				justifyContent: "End",
				items: [
					new sap.m.Label({
						required: true,
						text: ":"
					}).addStyleClass("paddingSplit"),
					new sap.m.Label({
						text: "MandatoryChar"
					}).addStyleClass("paddingSmall"),
					new sap.m.Label({
						text: "Bold Text:",
						design: "Bold"
					}).addStyleClass("paddingSplit"),
					new sap.m.Label({
						text: "ShortTxtRelChar"
					}).addStyleClass("paddingSmall"),
				]
			});

			var GridIconTabContent = new sap.ui.layout.Grid({
				defaultSpan: "XL6 L6 M6 S6",
				content: []
			});
			var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
			for (var a = 0; a < CharValueJsonModel.getData().results.length; a++) {
				var setDesign;
				var setRequired;
				var shorttext = CharValueJsonModel.getData().results[a].SHORTTEXTREL;
				if (shorttext == "X") {
					setDesign = sap.m.LabelDesign.Bold;
				} else {
					setDesign = sap.m.LabelDesign.Standard;
				}
				var mandatory = CharValueJsonModel.getData().results[a].MANDATORY;
				if (mandatory == "X") {
					setRequired = true;
				} else {
					setRequired = false;
				}
				var inputType = CharValueJsonModel.getData().results[a].DATATYP;
				if (inputType == "CHAR") {
					inputType = "Text"
				} else if (inputType == "NUM") {
					inputType = "Number"
				}
				
					var dropOnly = CharValueJsonModel.getData().results[a].DROPONLY;
					if(dropOnly == "X"){
						dropOnly = true
					}else{
						dropOnly = false
					}
					
					//code added so that axis designation will not get value help Udit kandh
					var noHelp = CharValueJsonModel.getData().results[a].NOHELP;
					if(noHelp == "X"){
						noHelp = false
					}else{
						noHelp = true
					}
				
				var CHARLEN = parseInt(CharValueJsonModel.getData().results[a].CHARLEN);
				var HBox = new sap.m.HBox({
					// alignItems: "Stretch",
					justifyContent: "End",
					items: [
						new sap.m.Label({
							text: CharValueJsonModel.getData().results[a].DESC,
							design: setDesign,
							required: setRequired
						}).addStyleClass("oDynamicLabelPadding"),
						new sap.m.Input({
							placeholder: "Type New Char Value",
							value: CharValueJsonModel.getData().results[a].DEFVALUE,
								width: "180px",
							// type: inputType,
							// maxLength: CHARLEN,
							showValueHelp: noHelp,
							valueHelpOnly:dropOnly,
								enabled:true,
								editable:true,
								
							valueHelpRequest: function (oEventInput) {
								debugger;
								that.selectedInput = oEventInput.getSource();
								var currentChar = oEventInput.getSource().getParent().getItems()[0].getText();
								// that.ClassificationTreeJSON
								var IcontabText = oEventInput.getSource().getParent().getParent().getParent().getText();
								for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
									if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
										// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
										for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
												that.getOwnerComponent().getModel("CharacteristicValueHelpJsonModel").setData(that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav
													.results[i].ET_CHAR_VALUENav);
											}
										}
									}
								}
								oControllerObjReqCopyMat.DuplicateFlag = "";
								oControllerObjReqCopyMat.getView().byId("idShortText_ReqCopyMat").setText("");
								oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setText("Validate Classification Information");
								oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setType("Emphasized");
								oControllerObjReqCopyMat.getView().byId("idReviewBtn_ReqCopyMat").setEnabled(false);

								var oView = that.getView();
								that.CharacteristicValueHelpDialogNewMat = oView.byId("CharacteristicValueHelp");
								if (!that.CharacteristicValueHelpDialogNewMat) {
									// create dialog via fragment factory
									that.CharacteristicValueHelpDialogNewMat = sap.ui.xmlfragment(oView.getId(),
										"z_app_spare_parts.z_spare_parts1.fragments.CharacteristicValueHelp",
										this.CharacteristicValueHelpDialogNewMat);
									// connect dialog to view (models, lifecycle)
									oView.addDependent(that.CharacteristicValueHelpDialogNewMat);
									that.CharacteristicValueHelpDialogNewMat.attachConfirm(function (oEvent) {
										debugger;
										var searchValue = "";
										var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
										// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
										var oBinding = oEvent.getSource().getBinding("items");
										var filters = new Array();
										filters.push(filterVALUE);
										// filters.push(filterPCNDesc);
										oBinding.filter(new sap.ui.model.Filter(filters, false));
										var sSelectedValue = oEvent.getParameters().selectedItem.getBindingContext("CharacteristicValueHelpJsonModel").getObject()
											.VALUE;
										that.selectedInput.setValue(sSelectedValue);

										var currentChar = that.selectedInput.getParent().getItems()[0].getText();
										// that.ClassificationTreeJSON
										var IcontabText = that.selectedInput.getParent().getParent().getParent().getText();
										for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
											if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
												// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
												for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
													if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
														that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "";
													}
												}
											}
										}
									});
									that.CharacteristicValueHelpDialogNewMat.attachSearch(function (oEvent) {
										debugger;
										var searchValue = oEvent.getParameter('value');
										var filterVALUE = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
										// var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
										var oBinding = oEvent.getSource().getBinding("items");
										var filters = new Array();
										filters.push(filterVALUE);
										// filters.push(filterPCNDesc);
										oBinding.filter(new sap.ui.model.Filter(filters, false));
									});
								}
								that.CharacteristicValueHelpDialogNewMat.open();
							},
							liveChange: function (oEvent) {
								debugger;

								var sSelectedValue = oEvent.getSource().getValue();

								var currentChar = oEvent.getSource().getParent().getItems()[0].getText();
								// that.ClassificationTreeJSON
								var IcontabText = oEvent.getSource().getParent().getParent().getParent().getText();
								for (var b = 0; b < that.ClassificationTreeJSON.results.length; b++) { // to traverse to icon tab and class from main model
									if (that.ClassificationTreeJSON.results[b].Class == IcontabText) {
										// var CharValueJsonModel = that.getOwnerComponent().getModel("CharValueJsonModel");
										for (var i = 0; i < that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results.length; i++) { // to traverse to valuehelp from main model
											if (that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DESC == currentChar) {
												that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].DEFVALUE = sSelectedValue;
												that.ClassificationTreeJSON.results[b].ET_CLASS_CHARNav.results[i].NEW = "X";
											}
										}
									}
								}
								oControllerObjReqCopyMat.DuplicateFlag = "";
								oControllerObjReqCopyMat.getView().byId("idShortText_ReqCopyMat").setText("");
								oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setText("Validate Classification Information");
								oControllerObjReqCopyMat.getView().byId("idValidateClassBtn_ReqCopyMat").setType("Emphasized");
								oControllerObjReqCopyMat.getView().byId("idReviewBtn_ReqCopyMat").setEnabled(false);
							}

						})
					]
				});
				GridIconTabContent.addContent(HBox);
			}

			ClassificationTree.addItem(new sap.m.IconTabFilter({
				visible: true,
				key: keyIndex,
				icon: "sap-icon://hint",
				text: oSubClass,
				content: [
					HeaderBar,
					// FormForIconTabContent,
					GridIconTabContent,
					FooterBar,
					FlexBoxInfo
				]
			}));
			keyIndex = keyIndex.toString();
			ClassificationTree.setSelectedKey(keyIndex);
			//	busyDialog.close();
		},
		function (oError) {
			debugger;
			//	busyDialog.close();
			sap.m.MessageBox
				.error(" Data fetch failed");
		});
};
var HeaderClass;
var selectedInput;
var BtnNextForLeafDisable;
// var CHARACTERISTIC_FIELD_ID = "GIMM_CLASS_HEADERNav/results";
// var CLASS_ID_FIELD_ID = "ID";
// var SUBCLASS_FIELD_ID = "GIMM_CLASS_SUBCLASSNav/results";
// var GENERATED_SHORT_TEXT = "";