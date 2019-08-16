var oControllerObjReqNewMat;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/m/MessageBox",
	"z_app_spare_parts/z_spare_parts1/util/SubClassContent",
	"z_app_spare_parts/z_spare_parts1/util/ValidateClassificationTree",
	"z_app_spare_parts/z_spare_parts1/util/InputMatInformation",
	"z_app_spare_parts/z_spare_parts1/util/MaterialCreation",

], function (Controller, MessageBox, Filter, SubClassContent, ValidateClassificationTree, InputMatInformation, MaterialCreation) {
	// "use strict";

	return Controller.extend("z_app_spare_parts.z_spare_parts1.controller.NewMaterial", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.NewMaterial
		 */
		onInit: function (oEvent) {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("NewMaterial").attachPatternMatched(this.loadInitDataNewMat, this);
			// },
			// loadInitDataNewMat: function () {
			oControllerObjReqNewMat = this;
			oControllerObjReqNewMat.selectedPlant = "";
			oControllerObjReqNewMat.selectedCostCenter = "";
			oControllerObjReqNewMat.DuplicateFlag = "";
			oControllerObjReqNewMat.ValidatedMatnr = "";
			oControllerObjReqNewMat.ValidateFlag = false;
			oControllerObjReqNewMat.setNoOEMFLAG = "";
			InputMatInformation.clearInputMatInformationReqNewMat(oControllerObjReqNewMat);
			
			oControllerObjReqNewMat._inputManualRestrict();
			
			
		},
		_inputManualRestrict:function()
		{
			var plantInput = this.getView().byId("idplantinput_value_ReqNewMat");
			plantInput.addDelegate({
				onAfterRendering: function() {
					plantInput.$().find('INPUT').attr('disabled', true).css('color', 'black');
				}
			}, plantInput);
			
			var PCNInput = this.getView().byId("idinputpcn_value_ReqNewMat");
			PCNInput.addDelegate({
				onAfterRendering: function() {
					PCNInput.$().find('INPUT').attr('disabled', true).css('color', 'black');
				}
			}, PCNInput);
			
			var BaseUnitInput = this.getView().byId("idBaseUOMinput_value_ReqNewMat");
			BaseUnitInput.addDelegate({
				onAfterRendering: function() {
					BaseUnitInput.$().find('INPUT').attr('disabled', true).css('color', 'black');
				}
			}, BaseUnitInput);
			
			var SparePartInput = this.getView().byId("idcomboboxconsumable_value_ReqNewMat");
			SparePartInput.addDelegate({
				onAfterRendering: function() {
					SparePartInput.$().find('INPUT').attr('disabled', true).css('color', 'black');
				}
			}, SparePartInput);
		},
		loadInitDataNewMat: function (oEvent) {
			debugger;
			//added by Udit to solve attachment issue. Now it will be clear whenever user come again to add attachment
			aUploadDataSet.results = [];

			var oemValue = oSearchController.getView().byId("idnumberOEM").getValue();
			if (oSearchController.ReqNewMatBtnClickFlag == false) { //to check if new mat btn is clicked
				if (oSearchController.ClassificationTreeJSON) { // to check if data filled in for Search by Classification tree
					if (oSearchController.ClassificationTreeJSON.results.length > 1) {
						var NewMatJSONClassTree = oSearchController.ClassificationTreeJSON;
						that = this;
						oControllerObjReqNewMat = this;
						that.ClassificationTreeJSON = NewMatJSONClassTree;
						var ClassificationTree = this.getView().byId("idIconTabBarRequestNewMaterial");
						ClassificationTree.destroyItems();
						SubClassContent.loadReqNewMatJSONClassificationTreeFromSearch(oControllerObjReqNewMat);
						// oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").setSelected(false);
						if (oControllerObjReqNewMat.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE != "") {
							var sSelectedValue = oControllerObjReqNewMat.ClassificationTreeJSON.results[0].ET_CLASS_CHARNav.results[0].DEFVALUE;
							oControllerObjReqNewMat.setNoOEMFLAG = "";
							oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
							oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(sSelectedValue);

						}
					} else {
						if (oControllerObjReqNewMat.ClassificationTreeJSON) {

						} else {
							z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadHeaderClass(oControllerObjReqNewMat);
							that = this;
							oControllerObjReqNewMat = this;
							// oControllerObjReqNewMat.NewValueFlag = "";	
							var ClassificationTree = oControllerObjReqNewMat.getView().byId("idIconTabBarRequestNewMaterial");
							// ClassificationTree.destroyItems();
							that.ClassificationTreeJSON = {
								results: []
							};
							that.ClassificationTreeJSONFlatStrc = {
								results: []
							};
							var ClassificationTree = this.getView().byId("idIconTabBarRequestNewMaterial")
							ClassificationTree.destroyItems();
							// var oemValue = oSearchController.getView().byId("idnumberOEM").getValue();
							// oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").setSelected(false);
							SubClassContent.loadReqNewMatJSONClassificationTreeInit(oControllerObjReqNewMat, oemValue);
							oControllerObjReqNewMat.getView().byId("idcheckboxstoragronly_value_ReqNewMat").setSelected(false);
							oControllerObjReqNewMat.getView().byId("idinputforecaseperiod_label_ReqNewMat").setRequired(true);
							oControllerObjReqNewMat.getView().byId("idinputperiod_label_ReqNewMat").setRequired(true);
							oControllerObjReqNewMat.getView().byId("idseriallevelinput_label_ReqNewMat").setRequired(false);
							oControllerObjReqNewMat.getView().byId("idinputserialnoprof_label_ReqNewMat").setRequired(false);
							oControllerObjReqNewMat.getView().byId("idcheckboxautserialno_value_ReqNewMat").setSelected(false);
						}
					}
				} else {

					if (oControllerObjReqNewMat.ClassificationTreeJSON) {
						if (oControllerObjReqNewMat.ClassificationTreeJSON.results.length > 1) {
							//do nothing
						} else {
							z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadHeaderClass(oControllerObjReqNewMat);
							that = this;
							oControllerObjReqNewMat = this;
							// oControllerObjReqNewMat.NewValueFlag = "";	
							var ClassificationTree = oControllerObjReqNewMat.getView().byId("idIconTabBarRequestNewMaterial");
							// ClassificationTree.destroyItems();
							that.ClassificationTreeJSON = {
								results: []
							};
							that.ClassificationTreeJSONFlatStrc = {
								results: []
							};
							// oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").setSelected(false);
							var ClassificationTree = this.getView().byId("idIconTabBarRequestNewMaterial")
							ClassificationTree.destroyItems();
							SubClassContent.loadReqNewMatJSONClassificationTreeInit(oControllerObjReqNewMat, oemValue);
							oControllerObjReqNewMat.getView().byId("idcheckboxstoragronly_value_ReqNewMat").setSelected(false);
							oControllerObjReqNewMat.getView().byId("idinputforecaseperiod_label_ReqNewMat").setRequired(true);
							oControllerObjReqNewMat.getView().byId("idinputperiod_label_ReqNewMat").setRequired(true);
							oControllerObjReqNewMat.getView().byId("idseriallevelinput_label_ReqNewMat").setRequired(false);
							oControllerObjReqNewMat.getView().byId("idinputserialnoprof_label_ReqNewMat").setRequired(false);
							oControllerObjReqNewMat.getView().byId("idcheckboxautserialno_value_ReqNewMat").setSelected(false);
						}
					} else {
						z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadHeaderClass(oControllerObjReqNewMat);
						that = this;
						oControllerObjReqNewMat = this;
						// oControllerObjReqNewMat.NewValueFlag = "";	
						var ClassificationTree = oControllerObjReqNewMat.getView().byId("idIconTabBarRequestNewMaterial");
						// ClassificationTree.destroyItems();
						that.ClassificationTreeJSON = {
							results: []
						};
						that.ClassificationTreeJSONFlatStrc = {
							results: []
						};
						var ClassificationTree = this.getView().byId("idIconTabBarRequestNewMaterial")
						ClassificationTree.destroyItems();
						// oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").setSelected(false);
						SubClassContent.loadReqNewMatJSONClassificationTreeInit(oControllerObjReqNewMat, oemValue);
						oControllerObjReqNewMat.getView().byId("idcheckboxstoragronly_value_ReqNewMat").setSelected(false);
						oControllerObjReqNewMat.getView().byId("idinputforecaseperiod_label_ReqNewMat").setRequired(true);
						oControllerObjReqNewMat.getView().byId("idinputperiod_label_ReqNewMat").setRequired(true);
						oControllerObjReqNewMat.getView().byId("idseriallevelinput_label_ReqNewMat").setRequired(false);
						oControllerObjReqNewMat.getView().byId("idinputserialnoprof_label_ReqNewMat").setRequired(false);
						oControllerObjReqNewMat.getView().byId("idcheckboxautserialno_value_ReqNewMat").setSelected(false);
					}
				}
			} else {
				if (oControllerObjReqNewMat.ClassificationTreeJSON) {
					if (oControllerObjReqNewMat.ClassificationTreeJSON.results.length > 1) {
						//do nothing
					} else {
						z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadHeaderClass(oControllerObjReqNewMat);
						that = this;
						oControllerObjReqNewMat = this;
						// oControllerObjReqNewMat.NewValueFlag = "";	
						var ClassificationTree = oControllerObjReqNewMat.getView().byId("idIconTabBarRequestNewMaterial");
						// ClassificationTree.destroyItems();
						that.ClassificationTreeJSON = {
							results: []
						};
						that.ClassificationTreeJSONFlatStrc = {
							results: []
						};
						var ClassificationTree = this.getView().byId("idIconTabBarRequestNewMaterial")
						ClassificationTree.destroyItems();
						// oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").setSelected(false);
						SubClassContent.loadReqNewMatJSONClassificationTreeInit(oControllerObjReqNewMat, oemValue);
						oControllerObjReqNewMat.getView().byId("idcheckboxstoragronly_value_ReqNewMat").setSelected(false);
						oControllerObjReqNewMat.getView().byId("idinputforecaseperiod_label_ReqNewMat").setRequired(true);
						oControllerObjReqNewMat.getView().byId("idinputperiod_label_ReqNewMat").setRequired(true);
						oControllerObjReqNewMat.getView().byId("idseriallevelinput_label_ReqNewMat").setRequired(false);
						oControllerObjReqNewMat.getView().byId("idinputserialnoprof_label_ReqNewMat").setRequired(false);
						oControllerObjReqNewMat.getView().byId("idcheckboxautserialno_value_ReqNewMat").setSelected(false);
					}
				} else {
					z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadHeaderClass(oControllerObjReqNewMat);
					that = this;
					oControllerObjReqNewMat = this;
					// oControllerObjReqNewMat.NewValueFlag = "";	
					var ClassificationTree = oControllerObjReqNewMat.getView().byId("idIconTabBarRequestNewMaterial");
					// ClassificationTree.destroyItems();
					that.ClassificationTreeJSON = {
						results: []
					};
					that.ClassificationTreeJSONFlatStrc = {
						results: []
					};
					var ClassificationTree = this.getView().byId("idIconTabBarRequestNewMaterial")
					ClassificationTree.destroyItems();
					// oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").setSelected(false);
					SubClassContent.loadReqNewMatJSONClassificationTreeInit(oControllerObjReqNewMat, oemValue);
					oControllerObjReqNewMat.getView().byId("idcheckboxstoragronly_value_ReqNewMat").setSelected(false);
					oControllerObjReqNewMat.getView().byId("idinputforecaseperiod_label_ReqNewMat").setRequired(true);
					oControllerObjReqNewMat.getView().byId("idinputperiod_label_ReqNewMat").setRequired(true);
					oControllerObjReqNewMat.getView().byId("idseriallevelinput_label_ReqNewMat").setRequired(false);
					oControllerObjReqNewMat.getView().byId("idinputserialnoprof_label_ReqNewMat").setRequired(false);
					oControllerObjReqNewMat.getView().byId("idcheckboxautserialno_value_ReqNewMat").setSelected(false);
				}
			}

			var oDataModelSP = this.getOwnerComponent().getModel("oDataModelSP");
			// /sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_HEADER_DATASet('WA00')
			oDataModelSP.read("/ET_HEADER_DATASet('WA00')", null, null, true,
				function (oData, oResponse) {
					debugger;
					var oNameContactModel = new sap.ui.model.json.JSONModel(oData);
					that.getView().setModel(oNameContactModel, "oNameContactModel");
					oNameContactModel.updateBindings(true);
					var UserInfoModel = oControllerObjReqNewMat.getView().getModel("oNameContactModel").getData();
					oControllerObjReqNewMat.getView().byId("idinputusername_value_ReqNewMat").setValue(UserInfoModel.ReqComment);
					oControllerObjReqNewMat.getView().byId("idinputcontact_value_ReqNewMat").setValue(UserInfoModel.Contact);
				},
				function (oError) {
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

		},

		onBeforeRendering: function (oEvent) {
			// oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
			// oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
			// InputMatInformation.clearInputMatInformationReqNewMat(oControllerObjReqNewMat);
		},
		onselectNoOEMCheckbox: function (oEvent) {
			debugger;
			var iconTabOEMPART = oEvent.getSource().getParent().getParent().getItems()[0].getItems()[0].getContent()[1].getContent()[0].getItems()[
				1].getValue();
			if (oEvent.getSource().getSelected() == true) {
				oControllerObjReqNewMat.setNoOEMFLAG = "X";
				oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue(iconTabOEMPART);
				oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue("");
			} else {
				oControllerObjReqNewMat.setNoOEMFLAG = "";
				oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
				oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue(iconTabOEMPART);
			}

		},
		onstorageonlycheckboxselected: function (oEvent) {
			debugger;
			if (oEvent.getSource().getSelected() == true) {
				this.byId("idinputperiod_label_ReqNewMat").setRequired(false);
				this.byId("idinputperiod_value_ReqNewMat").setValueState("None");	//for the value state by Udit
				this.byId("idinputforecaseperiod_label_ReqNewMat").setRequired(false);
				this.byId("idinputforecaseperiod_value_ReqNewMat").setValueState("None");	//for the value state by Udit

			} else {
				this.byId("idinputperiod_label_ReqNewMat").setRequired(true);
				this.byId("idinputforecaseperiod_label_ReqNewMat").setRequired(true);
			}
		},
		onselectcheckboxautserialno: function (oEvent) {
			debugger;
			if (oEvent.getSource().getSelected() == true) {
				this.byId("idseriallevelinput_label_ReqNewMat").setRequired(true);
				this.byId("idinputserialnoprof_label_ReqNewMat").setRequired(true);
			} else {
				this.byId("idseriallevelinput_label_ReqNewMat").setRequired(false);
				this.byId("idinputserialnoprof_label_ReqNewMat").setRequired(false);
			}

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.RequestCopyMaterial
		 */

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.NewMaterial
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.NewMaterial
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.NewMaterial
		 */
		//	onExit: function() {
		//
		//	}
		onPressReviewBtnReqNewMat: function (oEvent) {
			debugger;
			// that = this;
			// that.ValidateFlag;
			oControllerObjReqNewMat.reviewFlag_ReqNewMat = true;
			InputMatInformation.reviewInputMatInformationReqNewMat(oControllerObjReqNewMat);
			if (oControllerObjReqNewMat.reviewFlag_ReqNewMat == true) {
				MaterialCreation.onValidateMaterialCreation(oControllerObjReqNewMat);
				// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				// oRouter.navTo("ReviewReqNewMaterial");
			} else {
				sap.m.MessageBox
					.error("Please fill Mandatory Input Material Information");
			}

		},
		_onFioriObjectPageHeaderPress: function () {
			debugger;
			// that = this;
			// oControllerObjReqNewMat.getView().byId("idBtnNoOemAvailable_ReqNewMat").setSelected(false);
			oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").setText("");
			oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
			oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
			oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setType("Emphasized");
			that.ValidateFlag = false;
			InputMatInformation.clearInputMatInformationReqNewMat(oControllerObjReqNewMat);
			oControllerObjReqNewMat.DuplicateFlag = "";
			window.initialflag = true;
			oControllerObjReqNewMat.ClassificationTreeJSON = {
				results: []
			};
			var ClassificationTree = this.getView().byId("idIconTabBarRequestNewMaterial")
			ClassificationTree.destroyItems();
			// SubClassContent.loadReqNewMatJSONClassificationTreeInit(oControllerObjReqNewMat);
			/*var HBox = new sap.m.HBox({
				justifyContent: "End",
				items: [
					new sap.m.Label({
						text: "TEST_OEM_NUM",
						design: "Bold",
					}).addStyleClass("oDynamicLabelPadding"),
					new sap.m.Input({
						value: "",
						width: "auto"
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
				text: "SP_GIMM",
				content: [
					GridIconTabContent,
					new sap.m.Bar({
						contentRight: [
							new sap.m.Button({
								text: "Select Sub Class",
								type: "Emphasized",
								press: [this.onSelectSubClassBtnPressNewMat, this]
							})
						]
					})
				]
			}));*/
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("search");

		},
		onPressUploadButton: function (oEvent) {
			debugger;
			var fileUploader = new sap.ui.unified.FileUploader(this.createId("fileUploader"), {
				buttonOnly: false,
				width: "20rem",
				// height: "4rem",
				multiple: true,
				placeholder: "Choose a file for uploading..",
				uploadOnChange: false,
				buttonText: "Choose file",
				// fileType : ["pdf"]
			});
			var oUploadDialog = new sap.m.Dialog({
				title: "Upload File",
				content: [fileUploader],
				beginButton: new sap.m.Button({
					text: "Ok",
					tap: function (evt) {
						debugger;

						var oUploader = "";
						var oUploadBtnId = evt.getSource().sId;
						oUploader = fileUploader; // get file details
						var file = oUploader.oFileUpload.files[0];
						var fileName = file.name;
						//	var fileName = file.name.split(".")[0];
						var filetype = file.name.substring(file.name.lastIndexOf(".") + 1);
						var fileUrl = oUploader.oFileUpload.value;
						// if (filetype == "pdf" || filetype == "PDF") {

						var reader = new FileReader();
//						aUploadDataSet.results = [];
						reader.onload = (function (file) {
							return function (evt) {
								debugger;
								img = evt.target.result;
							//	aUploadDataSet.results = [];
								aUploadDataSet.results.push({
									"fileName": fileName,
									"fileUrl": fileUrl, // url
									"Delete": "sap-icon://Decline",
									"fileContent": img,
									"filetype": filetype,
									"file": file
								});

								var oModelAttachment = oControllerObjReqNewMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT");
								oModelAttachment.setData(aUploadDataSet);
								oModelAttachment.updateBindings(true);
								oModelAttachment.refresh(true);
								console.log(aUploadDataSet);
								console.log(oModelAttachment.getData());
								var oAttachmentsLst = oControllerObjReqNewMat.byId("idAttachment_value_ReqNewMat");
								var oItemlistTempAttachment = new sap.m.ObjectListItem({
									type: "Active",
									title: "{ATTACHMENT_MODEL_REQ_NEW_MAT>fileName}", //title
									type: sap.m.ListType.Navigation,
									press: function (evt) {
										
										console.log(evt);
										var item = evt.getSource().sId.substr("-1");
										var oModelAttach = oControllerObjReqNewMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT");
										var URL = oModelAttach.getData().results[item].fileUrl;
										window.open(URL, '_blank');
									}

								});
								// oAttachmentsLst.setModel(oModelAttachment, "ATTACHMENT_MODEL_REQ_NEW_MAT");
								oAttachmentsLst.bindAggregation("items", "ATTACHMENT_MODEL_REQ_NEW_MAT>/results", oItemlistTempAttachment);
								//											attachmentListReviewPlantExt.setModel(oModelAttachment,"EXTEND_PLANT_ATTACHMENT_MODEL");
								//											attachmentListReviewPlantExt.bindAggregation("items","EXTEND_PLANT_ATTACHMENT_MODEL>/results",oItemlistTempAttachment);
								oUploadDialog.close();
								oUploadDialog.destroy();
								oUploadDialog.destroyContent();

							};
						})(file);

						// // Read in the file as
						// arrayBuffer
						reader.readAsArrayBuffer(file);
						//									oModelData.setData(aUploadDataSet);
						return;
						// } else {
						// 	// when the file is other than tiff,pdf or txt
						// 	var FileTypeErrMsg = "This type of file cannot be uploaded, only PDF file format is allowed.";
						// 	var SystemMsg = "System Message";
						// 	sap.m.MessageBox.show(FileTypeErrMsg, sap.m.MessageBox.Icon.INFORMATION, SystemMsg, [sap.m.MessageBox.Action.CLOSE]);

						// }
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					tap: function (e) {
						oUploadDialog.close();
						oUploadDialog.destroy();
						oUploadDialog.destroyContent();
					}
				})
			});
			fileUploader.setValue("");
			oUploadDialog.open();

		},
		onDeleteAttachment: function (oEvent) {
			debugger;
			var oModelAttach = that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT");
			var copyoModelAttach = oModelAttach.getData().results;
			var item = oEvent.getParameters().listItem.sId.substr("-1");
			copyoModelAttach.splice(item, 1);
			oModelAttach.updateBindings(true);
			oModelAttach.refresh(true);
		},

		onConsumablehlppressed: function (oEvent) {
			debugger;
			// that = this;
			// var arrayConsumable = {
			// 	"results": []
			// };
			// arrayConsumable.results.push({
			// 	"value": "Consumable",
			// 	"descr": "Consumable",
			// });
			// arrayConsumable.results.push({
			// 	"value": "Non Consumable",
			// 	"descr": "Non Consumable",
			// });
			/*var oDataModel = this.getOwnerComponent().getModel("oDataModelDomain");*/
			var oDataModel = this.getOwnerComponent().getModel("oDataModelConfig");
			//	/sap/opu/odata/sap/ZC_MM_GET_DOM_VAL_CDS/ZC_MM_GET_DOM_VAL(p_domain='<Domain Name>')/Set
			var that = this;
			
			// changes made by Udit for new service
			/*oDataModel.read("/ZC_MM_GET_DOM_VAL(p_domain='ZMM_CONS_DOM')/Set", null, null, true,*/
			
			oDataModel.read("/ZC_MM_GET_CONFIG(p_appl='SPARE_PART',p_field='VAL_CLASS')/Set", null, null, true,
				function (oData, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("ConsumableJsonModel").setData(oData);
				},
				function (oError) {
					debugger;
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.oDialogConsumable = oView.byId("Consumabledialogid");
			if (!this.oDialogConsumable) {
				// create dialog via fragment factory
				this.oDialogConsumable = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.Consumable", this.oDialogConsumable);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogConsumable);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogConsumable.attachSearch(this.onhandleSearchConsumable);
				this.oDialogConsumable.attachConfirm(this.onDlgConfirmConsumable);
				this.oDialogConsumable.attachCancel(this.onDlgCancelConsumable);
				this.oDialogConsumable.attachLiveChange(this.onLivechangeDlgConsumable);

			}
			this.oDialogConsumable.open();

		},
		onhandleSearchConsumable: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterConsumable = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterConsumableDesc = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterConsumable);
			filters.push(filterConsumableDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onDlgConfirmConsumable: function (oEvent) {
			debugger;
			var selectedBaseUOM = oEvent.getParameters().selectedItem.getBindingContext("ConsumableJsonModel").getObject();
			var selectedBaseUOMvalue = selectedBaseUOM.value;
			oEvent.oSource.oParent.byId("idcomboboxconsumable_value_ReqNewMat").setValue(selectedBaseUOMvalue);
			oEvent.oSource.oParent.byId("idcomboboxconsumable_value_ReqNewMat").setDescription(selectedBaseUOM.descr);
			oEvent.oSource.oParent.byId("idcomboboxconsumable_value_ReqNewMat").setValueState("None");
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeDlgConsumable: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterConsumable = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterConsumableDesc = new sap.ui.model.Filter("descr", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterConsumable);
			filters.push(filterConsumableDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		
		onLiveChangeOEMVendor: function(oEvent){
			debugger;
			if(oEvent.getSource().getValue())
			oEvent.getSource().setValueState("None");
		},
		
		onLiveChangeSecondVendor: function(oEvent){
			debugger;
			if(oEvent.getSource().getValue())
			oEvent.getSource().setValueState("None");
		},
		
		onLiveChangeOEMPart: function(oEvent){
			debugger;
			if(oEvent.getSource().getValue())
			oEvent.getSource().setValueState("None");
		},
		
		onLiveChangeSecondPartNum: function(oEvent){
			debugger;
			if(oEvent.getSource().getValue())
			oEvent.getSource().setValueState("None");
		},
		
		
		onDlgCancelConsumable: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},
		//Consumable

		onBaseUOMhlppressed: function (oEvent) {
			debugger;
			// that = this;
			var oModel = this.getOwnerComponent().getModel("oDataModelConfig");
			//	/sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/ZC_MM_GET_CONFIG(p_appl='SPARE_PART',p_field='WERKS')/Set
			var that = this;
			oModel.read("/ZC_MM_GET_CONFIG(p_appl='SPARE_PART'%2Cp_field='MEINS')/Set", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("BaseUOMJsonModel").setData(oData1);

				},
				function (oError) {
					debugger;
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.oDialogBaseUOM = oView.byId("BaseUOMdialogid");
			if (!this.oDialogBaseUOM) {
				// create dialog via fragment factory
				this.oDialogBaseUOM = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.BaseUOM", this.oDialogBaseUOM);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogBaseUOM);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogBaseUOM.attachSearch(this.onhandleSearchBaseBUOM);
				this.oDialogBaseUOM.attachConfirm(this.onBaseUOMDlgConfirm);
				this.oDialogBaseUOM.attachCancel(this.onBaseUOMDlgCancel);
				this.oDialogBaseUOM.attachLiveChange(this.onLivechangeonBaseUOMDlg);

			}
			this.oDialogBaseUOM.open();

		},
		onhandleSearchBaseBUOM: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterBaseUOM = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterBaseUOMDesc = new sap.ui.model.Filter("descr", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterBaseUOM);
			filters.push(filterBaseUOMDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onBaseUOMDlgConfirm: function (oEvent) {
			debugger;
			var selectedBaseUOM = oEvent.getParameters().selectedItem.getBindingContext("BaseUOMJsonModel").getObject();
			var selectedBaseUOMvalue = selectedBaseUOM.value;
			oEvent.oSource.oParent.byId("idBaseUOMinput_value_ReqNewMat").setValue(selectedBaseUOMvalue);
			oEvent.oSource.oParent.byId("idBaseUOMinput_value_ReqNewMat").setDescription(selectedBaseUOM.descr);
			// change by Udit for value state
			oEvent.oSource.oParent.byId("idBaseUOMinput_value_ReqNewMat").setValueState("None");
			// change end
			oControllerObjReqNewMat.byId("idinputconversion_value_ReqNewMat").setDescription(selectedBaseUOMvalue);
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeonBaseUOMDlg: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterBaseUOM = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterBaseUOMDesc = new sap.ui.model.Filter("descr", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterBaseUOM);
			filters.push(filterBaseUOMDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		//Additional Storage type help pressed

		onAddStoreTypeHelpPressed: function (oEvent) {
			debugger;

			// that = this;
			var oModel = this.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/ZC_MM_GET_CONFIG(p_appl='SPARE_PART',p_field='WERKS')/Set
			var that = this;
			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'LGTYP' and VALUE eq '" + oControllerObjReqNewMat.selectedPlant + "'", null, null,
				true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("AddStoreTypeJsonModel").setData(oData1);

				},
				function (oError) {
					debugger;
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.oDialogaddstoretype = oView.byId("AddStoreTypedialogid");
			if (!this.oDialogaddstoretype) {
				// create dialog via fragment factory
				this.oDialogaddstoretype = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.AdditionalStorageType",
					this.oDialogaddstoretype);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogaddstoretype);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogaddstoretype.attachSearch(this.onhandleSearchAddStoreType);
				this.oDialogaddstoretype.attachConfirm(this.onAddStoreTypeConfirm);
				this.oDialogaddstoretype.attachCancel(this.onAddStoreTypeCancel);
				this.oDialogaddstoretype.attachLiveChange(this.onLivechangeAddStoreType);

				var bMultiSelect = !!oEvent.getSource().data("multi");
				this.oDialogaddstoretype.setMultiSelect(bMultiSelect);

				// Remember selections if required
				// var bRemember = !!oEvent.getSource().data("remember");
				// this.oDialogaddstoretype.setRememberSelections(bRemember);

				//add Clear button if needed
				// var bShowClearButton = !!oEvent.getSource().data("showClearButton");
				// this.oDialogaddstoretype.setShowClearButton(bShowClearButton);

				var getTokens = oEvent.getSource().getTokens();
				if (getTokens.length > 0) {
					for (var p = 0; p < getTokens.length; p++) {
						for (var r = 0; r < this.oDialogaddstoretype.getItems().length; r++) {
							if (getTokens[p].getText() == this.oDialogaddstoretype.getItems()[r].getTitle()) {
								this.oDialogaddstoretype.getItems()[r].setSelected(true);
							}
						}

					}
				}

			} else {
				var getTokens = oEvent.getSource().getTokens();
				if (getTokens.length > 0) {
					for (var p = 0; p < getTokens.length; p++) {
						for (var r = 0; r < this.oDialogaddstoretype.getItems().length; r++) {
							if (getTokens[p].getText() == this.oDialogaddstoretype.getItems()[r].getTitle()) {
								this.oDialogaddstoretype.getItems()[r].setSelected(true);
							}
						}

					}
				}

			}
			this.oDialogaddstoretype.open();

		},
		onhandleSearchAddStoreType: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterAddStoreType = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterAddStoreTypeDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterAddStoreType);
			filters.push(filterAddStoreTypeDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onAddStoreTypeConfirm: function (oEvent) {
			debugger;
			var lengthCounter = 0;
			if (oEvent.getSource().getItems().length > 0) {
				for (var e = 0; e < oEvent.getSource().getItems().length; e++) {
					if (oEvent.getSource().getItems()[e].getSelected() == true) {
						lengthCounter++;
					}
				}

				if (lengthCounter > 10) {
					sap.m.MessageBox
						.error(" Please select only 10 Storage Locations");
				} else {
					var selectedAddStore = oEvent.getParameters().selectedItem.getBindingContext("AddStoreTypeJsonModel").getObject();
					var selectedAddStorevalue = selectedAddStore.VALUE;
					var TokensArr = [];
					var tokenText;
					for (var i = 0; i < oEvent.getSource().getItems().length; i++) {
						if (oEvent.getSource().getItems()[i].getSelected() == true) {
							tokenText = oEvent.getSource().getItems()[i].getTitle();
							TokensArr.push(new sap.m.Token({
								text: tokenText
							}))
						}
					}
					oEvent.oSource.oParent.byId("addstoreinputid_value_ReqNewMat").setTokens(TokensArr);
					// oEvent.oSource.oParent.byId("addstoreinputid_value_ReqNewMat").setValue(selectedAddStorevalue);
					// oEvent.oSource.oParent.byId("addstoreinputid_value_ReqNewMat").setDescription(selectedAddStore.descr);	
				}
			}
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/
		},
		onLivechangeonBaseUOMDlg: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterAddStoreType = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterAddStoreTypeDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterAddStoreType);
			filters.push(filterAddStoreTypeDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},

		//serial Level help pressed
		onSerialLevelhelppressed: function (oEvent) {
			debugger;
			// that = this;
			var oModel = this.getOwnerComponent().getModel("oDataModelDomain");
			//	/sap/opu/odata/sap/ZC_MM_GET_DOM_VAL_CDS/ZC_MM_GET_DOM_VAL(p_domain='<Domain Name>')/Set
			var that = this;
			oModel.read("/ZC_MM_GET_DOM_VAL(p_domain='SERLV')/Set", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("SerialLevelJsonModel").setData(oData1);

				},
				function (oError) {
					debugger;
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.oDialogSerialLevel = oView.byId("serialleveldialogid");
			if (!this.oDialogSerialLevel) {
				// create dialog via fragment factory
				this.oDialogSerialLevel = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.SerialLevel", this.oDialogSerialLevel);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogSerialLevel);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogSerialLevel.attachSearch(this.onhandleSearchSerialLevelType);
				this.oDialogSerialLevel.attachConfirm(this.onSerialLevelConfirm);
				this.oDialogSerialLevel.attachCancel(this.onSerialLevelCancel);
				this.oDialogSerialLevel.attachLiveChange(this.onLivechangeSerialLevel);

			}
			this.oDialogSerialLevel.open();

		},
		onhandleSearchSerialLevelType: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterSerialLvl = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterSerialLvlDesc = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterSerialLvl);
			filters.push(filterSerialLvlDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onSerialLevelConfirm: function (oEvent) {
			debugger;
			var selectedSerialLevel = oEvent.getParameters().selectedItem.getBindingContext("SerialLevelJsonModel").getObject();
			// var selectedSerialLeveltext = selectedSerialLevel.text;
			if (selectedSerialLevel.value == "") {
				selectedSerialLevel.value = "0";
			}
			oEvent.oSource.oParent.byId("idseriallevelinput_value_ReqNewMat").setValue(selectedSerialLevel.value);
			oEvent.oSource.oParent.byId("idseriallevelinput_value_ReqNewMat").setDescription(selectedSerialLevel.text);
					/*change by Udit*/
			oEvent.oSource.oParent.byId("idseriallevelinput_value_ReqNewMat").setValueState("None");

			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeSerialLevel: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterSerialLvl = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterSerialLvlDesc = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterSerialLvl);
			filters.push(filterSerialLvlDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		//end of serial help pressed
		//on auto serial no pressed
		onautoserialnohelppressed: function (oEvent) {
			debugger;
			// that = this;
			var oModel = this.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
			var that = this;
			oModel.read("ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("AutSerialNoJsonModel").setData(oData1);

				},
				function (oError) {
					debugger;
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.oDialogSerialNumber = oView.byId("autserialnodialogid");
			if (!this.oDialogSerialNumber) {
				// create dialog via fragment factory
				this.oDialogSerialNumber = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.AutSerialNo", this.oDialogSerialNumber);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogSerialNumber);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogSerialNumber.attachSearch(this.onhandleSearchAutSerialNo);
				this.oDialogSerialNumber.attachConfirm(this.onAutSerialNoConfirm);
				this.oDialogSerialNumber.attachCancel(this.onAutSerialNoCancel);
				this.oDialogSerialNumber.attachLiveChange(this.onLivechangeAutSerialNo);

			}
			this.oDialogSerialNumber.open();

		},
		onhandleSearchAutSerialNo: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterAutSerialNo = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterAutSerialNoDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterAutSerialNo);
			filters.push(filterAutSerialNoDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onAutSerialNoConfirm: function (oEvent) {
			debugger;
			var selectedSerialNumber = oEvent.getParameters().selectedItem.getBindingContext("AutSerialNoJsonModel").getObject();
			var selectedSerialNumberval = selectedSerialNumber.VALUE;
			oEvent.oSource.oParent.byId("autserialinpid").setValue(selectedSerialNumberval);
			oEvent.oSource.oParent.byId("autserialinpid").setDescription(selectedSerialNumber.DESC);
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeAutSerialNo: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterAutSerialNo = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterAutSerialNoDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterAutSerialNo);
			filters.push(filterAutSerialNoDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		//aut serial help press end
		//plant help press start
		onPlantValueHelpPressedNewMat: function (oEvent) {
			debugger;
			busyDialog.open();
			// that = this;
			var oModel = that.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'

			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'WERKS' and VALUE eq ''", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("oPlantModelnewmat").setData(oData1);
					busyDialog.close();
				},
				function (oError) {
					debugger;
					busyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			var oView = this.getView();
			this.oDialogPlant = oView.byId("Plantdialogid");
			if (!this.oDialogPlant) {
				// create dialog via fragment factory
				this.oDialogPlant = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.Plant", this.oDialogPlant);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogPlant);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogPlant.attachSearch(this.onhandleSearchPlant);
				this.oDialogPlant.attachConfirm(this.onPlantConfirm);
				this.oDialogPlant.attachCancel(this.onPlantCancel);
				this.oDialogPlant.attachLiveChange(this.onLivechangePlant);
			}
			this.oDialogPlant.open();
		},

		onhandleSearchPlant: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterPlant = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterPlantDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterPlant);
			filters.push(filterPlantDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onPlantConfirm: function (oEvent) {
			debugger;
			var selectedPlant = oEvent.getParameters().selectedItem.getBindingContext("oPlantModelnewmat").getObject();
			oEvent.oSource.oParent.byId("idplantinput_value_ReqNewMat").setValue(selectedPlant.VALUE);
			oControllerObjReqNewMat.selectedPlant = selectedPlant.VALUE;
			oEvent.oSource.oParent.byId("idplantinput_value_ReqNewMat").setValueState("None");
			oEvent.oSource.oParent.byId("idplantinput_value_ReqNewMat").setDescription(selectedPlant.DESC);
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/
		},
		onLivechangePlant: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterPlant = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterPlantDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterPlant);
			filters.push(filterPlantDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onPlantCancel: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},
		//profit center
		onprofitcenterValueHelpPressedNewMat: function (oEvent) {
			debugger;
			// that = this;
			if (oControllerObjReqNewMat.selectedPlant == "") {
				sap.m.MessageBox
					.error("Please select Plant first");
			} else {
				busyDialog.open();
				var that = this;
				
				
				/*start udit*/
				var plant = that.getView().byId("idplantinput_value_ReqNewMat").getValue();
				var profitcenter = that.getView().byId("idinputprofitcentre_value_ReqNewMat").getValue();
				var costcenter = that.getView().byId("idinputcostcenter_value_ReqNewMat").getValue();
				/*end*/
				
				
				var oModel = that.getOwnerComponent().getModel("oDataModelSP");
				//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
				// /ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and DESC eq '<Plant>' and VALUE eq '<Cost Center>'
			
			
				/*commented by Udit */
				/*oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and DESC eq '" + oControllerObjReqNewMat.selectedPlant +
					"'and VALUE eq '" +
					oControllerObjReqNewMat.selectedCostCenter + "'", null, null, true,*/
					/*comment end*/
					
					
					oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and DESC eq '" + oControllerObjReqNewMat.selectedPlant +
					"'and VALUE eq '" +
					costcenter + "'", null, null, true,
					function (oData1, oResponse) {
						debugger;
						that.getOwnerComponent().getModel("oProfitcenterJSONModel").setData(oData1);
						busyDialog.close();
					},
					function (oError) {
						debugger;
						busyDialog.close();
						sap.m.MessageBox
							.error(" Data fetch failed");
					});

				var oView = this.getView();
				this.oDialogProfitCenter = oView.byId("Profitcenterdialogid");
				if (!this.oDialogProfitCenter) {
					// create dialog via fragment factory
					this.oDialogProfitCenter = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.Profitcenter", this.oDialogProfitCenter);
					// connect dialog to view (models, lifecycle)
					oView.addDependent(this.oDialogProfitCenter);
					/*	this.oDialog2.attachSearch(this.onhandleSearch);
						this.oDialog2.attachCancel(this.onhandleClose);
						this.oDialog2.attachConfirm(this.onCancelPress);*/

					this.oDialogProfitCenter.attachSearch(this.onhandleSearchProfitcenter);
					this.oDialogProfitCenter.attachConfirm(this.onConfirmProfitcenter);
					this.oDialogProfitCenter.attachCancel(this.onCancelProfitcenter);
					this.oDialogProfitCenter.attachLiveChange(this.onLivechangeProfitcenter);
				}
				this.oDialogProfitCenter.open();
			}

		},
		onhandleSearchProfitcenter: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterProfitCenter = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterProfitCenterDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterProfitCenter);
			filters.push(filterProfitCenterDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onConfirmProfitcenter: function (oEvent) {
			debugger;
			var selectedProfitCenter = oEvent.getParameters().selectedItem.getBindingContext("oProfitcenterJSONModel").getObject();
			oEvent.oSource.oParent.byId("idinputprofitcentre_value_ReqNewMat").setValue(selectedProfitCenter.VALUE);
			oControllerObjReqNewMat.selectedProfitCenter = selectedProfitCenter.VALUE
			oEvent.oSource.oParent.byId("idinputprofitcentre_value_ReqNewMat").setDescription(selectedProfitCenter.DESC);
			oEvent.oSource.oParent.byId("idinputprofitcentre_value_ReqNewMat").setValueState("None");
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeProfitcenter: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterProfitCenter = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterProfitCenterDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterProfitCenter);
			filters.push(filterProfitCenterDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		/*added by Udit*/
		onliveChangeProfitCenterField : function (oEvent) {
			debugger;
				var that = this;
				
				var plant = that.getView().byId("idplantinput_value_ReqNewMat").getValue();
				var profitcenter = that.getView().byId("idinputprofitcentre_value_ReqNewMat").getValue();
				var costcenter = that.getView().byId("idinputcostcenter_value_ReqNewMat").getValue();
				if(profitcenter==""){
					that.getView().byId("idinputprofitcentre_value_ReqNewMat").setDescription("");
				}
				var oModel = that.getOwnerComponent().getModel("oDataModelSP");
				//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
				// /ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and DESC eq '<Plant>' and VALUE eq '<Cost Center>'
				oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and DESC eq '" + oControllerObjReqNewMat.selectedPlant +
					"'and VALUE eq '" +
					costcenter + "'", null, null, true,
					function (oData1, oResponse) {
						debugger;
						that.getOwnerComponent().getModel("oProfitcenterJSONModel").setData(oData1);
						
					},
					function (oError) {
						debugger;
						
						sap.m.MessageBox
							.error(" Data fetch failed");
					});
		},
		/*end*/
		onCancelProfitcenter: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},

		//end of profit center help press

		//COST CENTER
		onPressCostcenterValuehelp: function (oEvent) {
			debugger;
			busyDialog.open();
			// that = this;
			var plant = this.getView().byId("idplantinput_value_ReqNewMat").getValue();
			var profitcenter = this.getView().byId("idinputprofitcentre_value_ReqNewMat").getValue();
			var oModel = this.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
			// /ET_CHAR_VALUESet?$filter=FIELD eq 'KOSTL' and VALUE eq '<PLANT>' and DESC eq '<PRCTR>'
			//	oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'KOSTL' and VALUE eq '" + oControllerObjReqNewMat.selectedPlant + "'", null, null,true,
			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'KOSTL' and VALUE eq '" + plant + "' and DESC eq '" + profitcenter + "'", null,
				null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("oCostcenterJsonModel").setData(oData1);
					busyDialog.close();
				},
				function (oError) {
					debugger;
					busyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			// var oModel = that.getOwnerComponent().getModel("oDataModelConfig");
			// //	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'

			// oModel.read("/ZC_MM_GET_CONFIG(p_appl='SPARE_PART'%2Cp_field='KOSTL')/Set", null, null, true,
			// 	function (oData1, oResponse) {
			// 		debugger;
			// 		that.getOwnerComponent().getModel("oCostcenterJsonModel").setData(oData1);
			// 		busyDialog.close();
			// 	},
			// 	function (oError) {
			// 		debugger;
			// 		busyDialog.close();
			// 		sap.m.MessageBox
			// 			.error(" Data fetch failed");
			// 	});
			//end service consumption
			var oView = this.getView();
			this.oDialogCostCenter = oView.byId("CostCenterdialogid");
			if (!this.oDialogCostCenter) {
				// create dialog via fragment factory
				this.oDialogCostCenter = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.CostCenter", this.oDialogCostCenter);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogCostCenter);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogCostCenter.attachSearch(this.onhandleSearchCostcenter);
				this.oDialogCostCenter.attachConfirm(this.onConfirmCostcenter);
				this.oDialogCostCenter.attachCancel(this.onCancelCostcenter);
				this.oDialogCostCenter.attachLiveChange(this.onLivechangeCostcenter);

			}
			this.oDialogCostCenter.open();

		},
		onhandleSearchCostcenter: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterCostCenter = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterCostCenterDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterCostCenter);
			filters.push(filterCostCenterDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onConfirmCostcenter: function (oEvent) {
			debugger;
			var selectedCostCenter = oEvent.getParameters().selectedItem.getBindingContext("oCostcenterJsonModel").getObject();
			oEvent.oSource.oParent.byId("idinputcostcenter_value_ReqNewMat").setValue(selectedCostCenter.VALUE);
			oControllerObjReqNewMat.selectedCostCenter = selectedCostCenter.VALUE;
			oEvent.oSource.oParent.byId("idinputcostcenter_value_ReqNewMat").setDescription(selectedCostCenter.DESC);
			oEvent.oSource.oParent.byId("idinputcostcenter_value_ReqNewMat").setValueState("None");
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeCostcenter: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterCostCenter = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterCostCenterDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterCostCenter);
			filters.push(filterCostCenterDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
			/*added by Udit*/
		onliveChangeCostCenterField : function (oEvent) {
			debugger;
			var plant = this.getView().byId("idplantinput_value_ReqNewMat").getValue();
			var profitcenter = this.getView().byId("idinputprofitcentre_value_ReqNewMat").getValue();
			var costcenter = this.getView().byId("idinputcostcenter_value_ReqNewMat").getValue();
			if(costcenter==""){
					that.getView().byId("idinputcostcenter_value_ReqNewMat").setDescription("");
				}
			var oModel = this.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
			// /ET_CHAR_VALUESet?$filter=FIELD eq 'KOSTL' and VALUE eq '<PLANT>' and DESC eq '<PRCTR>'
			//	oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'KOSTL' and VALUE eq '" + oControllerObjReqNewMat.selectedPlant + "'", null, null,true,
			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'KOSTL' and VALUE eq '" + plant + "' and DESC eq '" + profitcenter + "'", null,
				null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("oCostcenterJsonModel").setData(oData1);
					
				},
				function (oError) {
					debugger;
					
					sap.m.MessageBox
						.error(" Data fetch failed");
				});
		},
		onCancelCostcenter: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},

		//COST CENTER END

		//unit of issue
		onPressUnitOfIssueValuehelp: function (oEvent) {
			debugger;
			busyDialog.open();
			// that = this;
			var oModel = that.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'

			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'MSEHI'", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("oUnitOfIssueModel").setData(oData1);
					busyDialog.close();
				},
				function (oError) {
					debugger;
					busyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			var oView = this.getView();
			this.oDialogUnitOfIssue = oView.byId("UnitOfIssuedialogid");
			if (!this.oDialogUnitOfIssue) {
				// create dialog via fragment factory
				this.oDialogUnitOfIssue = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.UnitOfIssue", this.oDialogUnitOfIssue);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogUnitOfIssue);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogUnitOfIssue.attachSearch(this.onhandleSearchUnitOfIssue);
				this.oDialogUnitOfIssue.attachConfirm(this.onConfirmUnitOfIssue);
				this.oDialogUnitOfIssue.attachCancel(this.onCancelUnitOfIssue);
				this.oDialogUnitOfIssue.attachLiveChange(this.onLivechangeUnitOfIssue);
			}
			this.oDialogUnitOfIssue.open();
		},
		onhandleSearchUnitOfIssue: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterUOI = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterUOIDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterUOI);
			filters.push(filterUOIDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onConfirmUnitOfIssue: function (oEvent) {
			debugger;
			var selectedUnitOfIssue = oEvent.getParameters().selectedItem.getBindingContext("oUnitOfIssueModel").getObject();
			oEvent.oSource.oParent.byId("idinputuoi_value_ReqNewMat").setValue(selectedUnitOfIssue.VALUE);
			oEvent.oSource.oParent.byId("idinputuoi_value_ReqNewMat").setDescription(selectedUnitOfIssue.DESC);
			oEvent.oSource.oParent.byId("idinputuoi_value_ReqNewMat").setValueState("None");
			oControllerObjReqNewMat.byId("idinputconversion_value1_ReqNewMat").setDescription(selectedUnitOfIssue.VALUE);
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeUnitOfIssue: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterUOI = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterUOIDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterUOI);
			filters.push(filterUOIDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onCancelUnitOfIssue: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},

		//end of unit of issue help press
		//serialno prof
		onserialnoprofValueHelpPressed: function (oEvent) {
			debugger;
			busyDialog.open();
			// that = this;
			var oModel = that.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'

			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("oSerialNoJsonModel").setData(oData1);
					busyDialog.close();
				},
				function (oError) {
					debugger;
					busyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			var oView = this.getView();
			this.oDialogSerialNo = oView.byId("SerialNodialogid");
			if (!this.oDialogSerialNo) {
				// create dialog via fragment factory
				this.oDialogSerialNo = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.SerialNo", this.oDialogSerialNo);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogSerialNo);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogSerialNo.attachSearch(this.onhandleSearchSerialNo);
				this.oDialogSerialNo.attachConfirm(this.onConfirmSerialNo);
				this.oDialogSerialNo.attachCancel(this.onCancelSerialNo);
				this.oDialogSerialNo.attachLiveChange(this.onLivechangeSerialNo);
			}
			this.oDialogSerialNo.open();

		},
		onhandleSearchSerialNo: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterSerialNo = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterSerialNoDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterSerialNo);
			filters.push(filterSerialNoDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onConfirmSerialNo: function (oEvent) {
			debugger;
			var selectedSerialNo = oEvent.getParameters().selectedItem.getBindingContext("oSerialNoJsonModel").getObject();
			oEvent.oSource.oParent.byId("idinputserialnoprof_value_ReqNewMat").setValue(selectedSerialNo.VALUE);
			oEvent.oSource.oParent.byId("idinputserialnoprof_value_ReqNewMat").setDescription(selectedSerialNo.DESC);
			oEvent.oSource.oParent.byId("idinputserialnoprof_value_ReqNewMat").setValueState("None");
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeSerialNo: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterSerialNo = new sap.ui.model.Filter("VALUE", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterSerialNoDesc = new sap.ui.model.Filter("DESC", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterSerialNo);
			filters.push(filterSerialNoDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onCancelSerialNo: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},

		//end of serialno prof help press
		//critical part help pressed
		onCriticalPartvalueHelpPress: function (oEvent) {
			debugger;
			busyDialog.open();
			var oModel = this.getOwnerComponent().getModel("oDataModelDomain");
			//	/sap/opu/odata/sap/ZC_MM_GET_DOM_VAL_CDS/ZC_MM_GET_DOM_VAL(p_domain='<Domain Name>')/Set
			// that = this;
			oModel.read("/ZC_MM_GET_DOM_VAL(p_domain='ZMM_CRIT_PART_DOM')/Set", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("oCriticalPartJSONModel").setData(oData1);
					busyDialog.close();
				},
				function (oError) {
					debugger;
					busyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.oDialogCriticalPart = oView.byId("CriticalPartdialogid");
			if (!this.oDialogCriticalPart) {
				// create dialog via fragment factory
				this.oDialogCriticalPart = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.CriticalPart", this.oDialogSerialLevel);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogCriticalPart);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogCriticalPart.attachSearch(this.onhandleSearchCriticalPart);
				this.oDialogCriticalPart.attachConfirm(this.onConfirmCriticalPart);
				this.oDialogCriticalPart.attachCancel(this.onCancelCriticalPart);
				this.oDialogCriticalPart.attachLiveChange(this.onLivechangeCriticalPart);

			}
			this.oDialogCriticalPart.open();

		},
		onhandleSearchCriticalPart: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterCritPart = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterCritPartDesc = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterCritPart);
			filters.push(filterCritPartDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onConfirmCriticalPart: function (oEvent) {
			debugger;
			var selectedCriticalPart = oEvent.getParameters().selectedItem.getBindingContext("oCriticalPartJSONModel").getObject();
			// var selectedSerialLeveltext = selectedSerialLevel.text;
			oEvent.oSource.oParent.byId("idinputcriticalpart_value_ReqNewMat").setValue(selectedCriticalPart.value);
			oEvent.oSource.oParent.byId("idinputcriticalpart_value_ReqNewMat").setDescription(selectedCriticalPart.text);
			oEvent.oSource.oParent.byId("idinputcriticalpart_value_ReqNewMat").setValueState("None");
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangeCriticalPart: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterCritPart = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterCritPartDesc = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterCritPart);
			filters.push(filterCritPartDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onCancelCriticalPart: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},
		//end of serial help pressed
		//start of period val help
		onPeriodvalueHelpPress: function (oEvent) {
			debugger;
			busyDialog.open();
			var oModel = this.getOwnerComponent().getModel("oDataModelDomain");
			//	/sap/opu/odata/sap/ZC_MM_GET_DOM_VAL_CDS/ZC_MM_GET_DOM_VAL(p_domain='<Domain Name>')/Set
			// that = this;
			oModel.read("/ZC_MM_GET_DOM_VAL(p_domain='ZMM_PERIOD_DOM')/Set", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("oPeriodJSONModel").setData(oData1);
					busyDialog.close();
				},
				function (oError) {
					debugger;
					busyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.oDialogPeriod = oView.byId("Perioddialogid");
			if (!this.oDialogPeriod) {
				// create dialog via fragment factory
				this.oDialogPeriod = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.Period", this.oDialogPeriod);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogPeriod);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogPeriod.attachSearch(this.onhandleSearchPeriod);
				this.oDialogPeriod.attachConfirm(this.onConfirmPeriod);
				this.oDialogPeriod.attachCancel(this.onCancelPeriod);
				this.oDialogPeriod.attachLiveChange(this.onLivechangePeriod);

			}
			this.oDialogPeriod.open();

		},
		onhandleSearchPeriod: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterPeriod = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterPeriodDesc = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterPeriod);
			filters.push(filterPeriodDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onConfirmPeriod: function (oEvent) {
			debugger;
			var selectedPeriod = oEvent.getParameters().selectedItem.getBindingContext("oPeriodJSONModel").getObject();
			// var selectedSerialLeveltext = selectedSerialLevel.text;
			oEvent.oSource.oParent.byId("idinputperiod_value_ReqNewMat").setValue(selectedPeriod.value);
			oEvent.oSource.oParent.byId("idinputperiod_value_ReqNewMat").setDescription(selectedPeriod.text);
			oEvent.oSource.oParent.byId("idinputperiod_value_ReqNewMat").setValueState("None");
			/*added by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/

		},
		onLivechangePeriod: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterPeriod = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterPeriodDesc = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterPeriod);
			filters.push(filterPeriodDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onCancelPeriod: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},
		//end of period help pressed
		//subclass button press in icon tab bar
		onSelectSubClassBtnPressNewMat: function (oEvent) {
			debugger;
			// that = this;
			if (!oControllerObjReqNewMat.ClassificationTreeJSON) {
				oControllerObjReqNewMat.ClassificationTreeJSON = {
					results: []
				};
				// var oSubClass = "SP_GIMM"
				SubClassContent.loadJSONClassificationTree(HeaderClass, oControllerObjReqNewMat);
				var oView = this.getView();

				this.SubClassDialogNewMat = oView.byId("SubClassDialogid");
				if (!this.SubClassDialogNewMat) {
					// create dialog via fragment factory
					this.SubClassDialogNewMat = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog", this
						.SubClassDialogNewMat);
					// connect dialog to view (models, lifecycle)
					oView.addDependent(this.SubClassDialogNewMat);
					/*	this.oDialog2.attachSearch(this.onhandleSearch);
						this.oDialog2.attachCancel(this.onhandleClose);
						this.oDialog2.attachConfirm(this.onCancelPress);*/
					this.SubClassDialogNewMat.attachConfirm(this.onSubClasshandleConfirm);
					this.SubClassDialogNewMat.attachCancel(this.onSubClasshandleClose);
				}
				this.SubClassDialogNewMat.open();
			} else if (oControllerObjReqNewMat.ClassificationTreeJSON.results.length == 0 || oControllerObjReqNewMat.ClassificationTreeJSON.results
				.length == 1) {
				oControllerObjReqNewMat.ClassificationTreeJSON = {
					results: []
				};
				var oSubClass = "SP_GIMM"
				SubClassContent.loadJSONClassificationTree(HeaderClass, oControllerObjReqNewMat);
				var oView = this.getView();

				this.SubClassDialogNewMat = oView.byId("SubClassDialogid");
				if (!this.SubClassDialogNewMat) {
					// create dialog via fragment factory
					this.SubClassDialogNewMat = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog", this
						.SubClassDialogNewMat);
					// connect dialog to view (models, lifecycle)
					oView.addDependent(this.SubClassDialogNewMat);
					/*	this.oDialog2.attachSearch(this.onhandleSearch);
						this.oDialog2.attachCancel(this.onhandleClose);
						this.oDialog2.attachConfirm(this.onCancelPress);*/
					this.SubClassDialogNewMat.attachConfirm(this.onSubClasshandleConfirm);
					this.SubClassDialogNewMat.attachCancel(this.onSubClasshandleClose);
				}
				this.SubClassDialogNewMat.open();
			} else {
				// if (oControllerObjReqNewMat.ClassificationTreeJSON.results > 0) {
				sap.m.MessageBox
					.error(" You already have selected Sub Class");
			}
		},
		onSubClasshandleConfirm: function (oEvent) { //on press select SUb class for sub class level
			debugger;
			//	var oControllerObjReqNewMat = this;
			var selectedSubClass = oEvent.getParameters().selectedItem.getBindingContext("SubClassJsonModel").getObject().CLASS;
			SubClassContent.loadJSON_Content_ClassificationTree_NewMaterial(oEvent, selectedSubClass, oControllerObjReqNewMat);

		},
		onSelectValidateClassBtnPressNewMat: function (oEvent) {
			debugger
			oControllerObjReqNewMat.matShorttext = "";
			ValidateClassificationTree.ValidateClassificationTreeInfo(oEvent, oControllerObjReqNewMat);
		},

		onPCNValueHelppress: function (oEvent) {
			debugger;
			busyDialog.open();
			// this.onButtonPress();
			var oModel = this.getOwnerComponent().getModel("oDataModelPCN");
			var that = this;
			oModel.read("/ZC_MM_PCN_LIST(p_appl='SPARE_PART')/Set", null, null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("PCNJsonModel").setData(oData1);
					busyDialog.close();
				},
				function (oError) {
					debugger;
					busyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.PCNdialog = oView.byId("PCNDialog");

			if (!this.PCNdialogNewMat) {
				// create dialog via fragment factory
				this.PCNdialogNewMat = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.PCNdialog", this.PCNdialogNewMat);
				this.PCNdialogNewMat.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.PCNdialogNewMat);
				this.PCNdialogNewMat.attachSearch(this.onhandleSearchPCN);
				this.PCNdialogNewMat.attachCancel(this.onCancelPressPCN);
				this.PCNdialogNewMat.attachConfirm(this.onhandleConfirmPCN);
				this.PCNdialogNewMat.attachLiveChange(this.onlivechangePCN);

			}
			this.PCNdialogNewMat.open();
		},
		onhandleSearchPCN: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterPCN = new sap.ui.model.Filter("pcn", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterPCN);
			filters.push(filterPCNDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onhandleConfirmPCN: function (oEvent) {
			debugger;
			var selectedPCN = oEvent.getParameters().selectedItem.getBindingContext("PCNJsonModel").getObject();
			oEvent.oSource.oParent.byId("idinputpcn_value_ReqNewMat").setValue(selectedPCN.pcn);
			oEvent.oSource.oParent.byId("idinputpcn_value_ReqNewMat").setDescription(selectedPCN.description);
			oEvent.oSource.oParent.byId("idinputpcn_value_ReqNewMat").setValueState("None");
			/*added by udit to clear the search issue of value help*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/
		},
		onlivechangePCN: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterPCN = new sap.ui.model.Filter("pcn", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterPCN);
			filters.push(filterPCNDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		inputforecaseperiodliveChange: function (oEvent) {
			debugger;
			
			/*var numbers = /^[1-9]+$/;*/
			//now zero can also be placed afetr a digit like 10, 100, 200 but but like 01 added by Udit
			var numbers = /^[1-9][0-9]*$/;
			if (oEvent.getSource().getValue().valueOf().match(numbers) == null) {

				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Only Numbers/Intergers allowed");
				oEvent.getSource().setValue("");
				oControllerObjReqNewMat.reviewFlag_ReqNewMat = false;
			} else {
				oEvent.getSource().setValueState("None");
				oControllerObjReqNewMat.reviewFlag_ReqNewMat = true;
			}
		},
		inputquantityperbatchliveChange: function (oEvent) {
			debugger;
			var numbers = /^[0-9]+$/;
			if (oEvent.getSource().getValue().valueOf().match(numbers) == null) {

				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Only Numbers/Intergers allowed");
				oEvent.getSource().setValue("");
				oControllerObjReqNewMat.reviewFlag_ReqNewMat = false;
			} else {
				oEvent.getSource().setValueState("None");
				oControllerObjReqNewMat.reviewFlag_ReqNewMat = true;
			}

		},
		onConversionInput: function (oEvent) {
			debugger;
			var numbers = /^[0-9]+$/;
			if (oEvent.getSource().getValue().valueOf().match(numbers) == null) {

				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Only Numbers/Intergers allowed");
				oEvent.getSource().setValue("");
				oControllerObjReqNewMat.reviewFlag_ReqNewMat = false;
			} else {
				oEvent.getSource().setValueState("None");
				oControllerObjReqNewMat.reviewFlag_ReqNewMat = true;
			}

		},

	});

});
var that;
var selectedPlant = "";
var busyDialog = new sap.m.BusyDialog();
var reviewFlag_ReqNewMat;
var oControllerObjReqNewMat;

var aUploadDataSet = {
	"results": []
};