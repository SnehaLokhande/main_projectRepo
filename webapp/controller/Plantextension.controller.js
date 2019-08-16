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
	return Controller.extend("z_app_spare_parts.z_spare_parts1.controller.Plantextension", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.Plantextension
		 */
		//
		onInit: function (oEvent) {
			debugger;
			oControllerObjPlantExtension = this;
			oControllerObjPlantExtension.selectedPlant = "";
			oControllerObjPlantExtension.selectedCostCenter = "";
			oControllerObjPlantExtension.ValidatedMatnr = "";
			oControllerObjPlantExtension.setNoOEMFLAG = "";
			that = this;
			oControllerObjPlantExtension.PlantExtensiononBack = false;
			InputMatInformation.clearInputMatInformationPlantExtension(oControllerObjPlantExtension);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Plantextension").attachPatternMatched(this.generateCopymaterialContent, this);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.RequestCopyMaterial
		 */
		generateCopymaterialContent: function (oEvent) {
			debugger
				//added by Udit to solve attachment issue. Now it will be clear whenever user come again to add attachment
			aUploadDataSet.results = [];
			// var busyDialog = new sap.m.BusyDialog();
			if (oControllerObjPlantExtension.PlantExtensiononBack == false) { //so that the data for copy mat does not load again on back from review
				busyDialog.open();
				// InputMatInformation.clearInputMatInformationPlantExtension(oControllerObjPlantExtension);
				var oDataModel = this.getOwnerComponent().getModel("oDataModelSP");
				// oSearchController.Matnr
				// oSearchController.Plant
				oDataModel.read(
					"/ET_MATCOPYSet/?$expand=ET_CLASS_HEADERNav/ET_CLASS_CHARNav/ET_CHAR_VALUENav&$filter=Matnr%20eq%20'" + oSearchController.Matnr +
					"'%20and%20Werks%20eq%20'" + oSearchController.Plant + "'",
					null, null,
					true,
					function (oData1, oResponse) {
						debugger;
						oControllerObjPlantExtension.getOwnerComponent().getModel("oRequestCopyMaterialModel").setData(oData1);
						// var oSubClass = "TEST_SP"
						InputMatInformation.loadInputMatInformationPlantExtension(oControllerObjPlantExtension);
						busyDialog.close();
					},
					function (oError) {
						debugger;
						busyDialog.close();
						sap.m.MessageBox
							.error(" Data fetch failed");
					});
				//end service consumption}
				oControllerObjPlantExtension.getView().byId("idcheckboxstoragronly_value_PlantExtension").setSelected(false);
				oControllerObjPlantExtension.getView().byId("idinputforecaseperiod_label_PlantExtension").setRequired(true);
				oControllerObjPlantExtension.getView().byId("idinputperiod_label_PlantExtension").setRequired(true);
				oControllerObjPlantExtension.getView().byId("idseriallevelinput_label_PlantExtension").setRequired(false);
				oControllerObjPlantExtension.getView().byId("idinputserialnoprof_label_PlantExtension").setRequired(false);
				oControllerObjPlantExtension.getView().byId("idcheckboxautserialno_value_PlantExtension").setSelected(false);
			}
			// /sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_HEADER_DATASet('WA00')
			var oDataModel = this.getOwnerComponent().getModel("oDataModelSP");
			oDataModel.read("/ET_HEADER_DATASet('WA00')", null, null, true,
				function (oData, oResponse) {
					debugger;
					var oNameContactModel = new sap.ui.model.json.JSONModel(oData);
					oControllerObjPlantExtension.getView().setModel(oNameContactModel, "oNameContactModel");
					oNameContactModel.updateBindings(true);
					var UserInfoModel = oControllerObjPlantExtension.getView().getModel("oNameContactModel").getData()
					oControllerObjPlantExtension.getView().byId("idinputusername_value_PlantExtension").setValue(UserInfoModel.ReqComment);
					oControllerObjPlantExtension.getView().byId("idinputcontact_value_PlantExtension").setValue(UserInfoModel.Contact);
				},
				function (oError) {
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			// }

		},
		onBeforeRendering: function (oEvent) {

			// oControllerObjReqNewMat.getView().byId("idValidateClassBtn_ReqNewMat").setText("Validate Classification Information");
			// oControllerObjReqNewMat.getView().byId("idReviewBtn_ReqnewMat").setEnabled(false);
			// InputMatInformation.clearInputMatInformationReqNewMat(oControllerObjReqNewMat);
		},
		onstorageonlycheckboxselected: function (oEvent) {
			debugger;
			if (oEvent.getSource().getSelected() == true) {
				this.byId("idinputperiod_label_PlantExtension").setRequired(false);
				this.byId("idinputforecaseperiod_label_PlantExtension").setRequired(false);
			} else {
				this.byId("idinputperiod_label_PlantExtension").setRequired(true);
				this.byId("idinputforecaseperiod_label_PlantExtension").setRequired(true);
			}
		},
		onselectcheckboxautserialno: function (oEvent) {
			debugger;
			if (oEvent.getSource().getSelected() == true) {
				this.byId("idseriallevelinput_label_PlantExtension").setRequired(true);
				this.byId("idinputserialnoprof_label_PlantExtension").setRequired(true);
			} else {
				this.byId("idseriallevelinput_label_PlantExtension").setRequired(false);
				this.byId("idinputserialnoprof_label_PlantExtension").setRequired(false);
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
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.PlantExtensionerial
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.PlantExtensionerial
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.PlantExtensionerial
		 */
		//	onExit: function() {
		//
		//	}
		onPressReviewBtnPlantExtension: function (oEvent) {
			debugger;
			// that = this;
			// that.ValidateFlag;

			oControllerObjPlantExtension.reviewFlag_PlantExtension = true;
			InputMatInformation.reviewInputMatInformationPlantExtension(this);
			if (oControllerObjPlantExtension.reviewFlag_PlantExtension == true) {
				oControllerObjPlantExtension.PlantExtensiononBack = true;
				MaterialCreation.onValidatePlantExtension(oControllerObjPlantExtension);
				// var oRouter = sap.ui.core.UIComponent.getRouterFor(oControllerObjPlantExtension);
				// oRouter.navTo("ReviewPlantExtension");
			} else {
				sap.m.MessageBox
					.error("Please fill Mandatory Input Material Information");
			}
		},
		_onFioriObjectPageHeaderPress: function () {
			debugger;
			InputMatInformation.clearInputMatInformationPlantExtension(oControllerObjPlantExtension);
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
				buttonText: "Choose file"
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
						oUploader = fileUploader;
						// get file details
						var file = oUploader.oFileUpload.files[0];
						var fileName = file.name;
						// var fileName = file.name.split(".")[0];
						var filetype = file.name.substring(file.name.lastIndexOf(".") + 1);
						var fileUrl = oUploader.oFileUpload.value;
						// if (filetype == "pdf" || filetype == "PDF") {
						var reader = new FileReader();
						reader.onload = function (file) {
							return function (evt) {
								debugger;
								img = evt.target.result;
								aUploadDataSet.results.push({
									"fileName": fileName,
									"fileUrl": fileUrl,
									// url
									"Delete": "sap-icon://Decline",
									"fileContent": img,
									"filetype": filetype,
									"file": file
								});
								var oModelAttachment = oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT");
								oModelAttachment.setData(aUploadDataSet);
								oModelAttachment.updateBindings(true);
								oModelAttachment.refresh(true);
								console.log(aUploadDataSet);
								console.log(oModelAttachment.getData());
								var oAttachmentsLst = oControllerObjPlantExtension.byId("idAttachment_value_PlantExtension");
								var oItemlistTempAttachment = new sap.m.ObjectListItem({
									type: "Active",
									title: "{ATTACHMENT_MODEL_PLANT_EXT>fileName}",
									//title
									type: sap.m.ListType.Navigation,
									press: function (evt) {
										debugger;
										console.log(evt);
										var item = evt.getSource().sId.substr("-1");
										var oModelAttach = oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT");
										var URL = oModelAttach.getData().results[item].fileUrl;
										window.open(URL, "_blank");
									}
								});
								// oAttachmentsLst.setModel(oModelAttachment, "ATTACHMENT_MODEL_PLANT_EXT");
								oAttachmentsLst.bindAggregation("items", "ATTACHMENT_MODEL_PLANT_EXT>/results", oItemlistTempAttachment);
								//											attachmentListReviewPlantExt.setModel(oModelAttachment,"EXTEND_PLANT_ATTACHMENT_MODEL");
								//											attachmentListReviewPlantExt.bindAggregation("items","EXTEND_PLANT_ATTACHMENT_MODEL>/results",oItemlistTempAttachment);
								oUploadDialog.close();
								oUploadDialog.destroy();
								oUploadDialog.destroyContent();
							};
						}(file);
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
			var oModelAttach = oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT");
			var copyoModelAttach = oModelAttach.getData().results;
			var item = oEvent.getParameters().listItem.sId.substr("-1");
			copyoModelAttach.splice(item, 1);
			oModelAttach.updateBindings(true);
			oModelAttach.refresh(true);
		},
		onConsumablehlppressed: function (oEvent) {
			debugger;
			/*added by udit*/
			/*this.getView().getModel("ConsumableJsonModel").refresh();*/
			/*end*/
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
			var oDataModel = this.getOwnerComponent().getModel("oDataModelConfig");
			//	/sap/opu/odata/sap/ZC_MM_GET_DOM_VAL_CDS/ZC_MM_GET_DOM_VAL(p_domain='<Domain Name>')/Set
			var that = this;
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
			oEvent.oSource.oParent.byId("idcomboboxconsumable_value_PlantExtension").setValue(selectedBaseUOMvalue);
			oEvent.oSource.oParent.byId("idcomboboxconsumable_value_PlantExtension").setDescription(selectedBaseUOM.descr);
			oEvent.oSource.oParent.byId("idcomboboxconsumable_value_PlantExtension").setValueState("None");
			/*changed by udit*/
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
			oModel.read("/ZC_MM_GET_CONFIG(p_appl='SPARE_PART'%2Cp_field='MEINS')/Set", null, null, true, function (oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("BaseUOMJsonModel").setData(oData1);
			}, function (oError) {
				debugger;
				sap.m.MessageBox.error(" Data fetch failed");
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
			oEvent.oSource.oParent.byId("idBaseUOMinput_value_PlantExtension").setValue(selectedBaseUOMvalue);
			oEvent.oSource.oParent.byId("idBaseUOMinput_value_PlantExtension").setDescription(selectedBaseUOM.descr);
			oControllerObjPlantExtension.byId("idinputconversion_value_PlantExtension").setDescription(selectedBaseUOMvalue);
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
			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'LGTYP' and VALUE eq '" + oControllerObjPlantExtension.selectedPlant + "'", null,
				null, true,
				function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("AddStoreTypeJsonModel").setData(oData1);
				},
				function (oError) {
					debugger;
					sap.m.MessageBox.error(" Data fetch failed");
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
				// Remember selections if required
				// var bRemember = !!oEvent.getSource().data("remember");
				// this.oDialogaddstoretype.setRememberSelections(bRemember);
				var bMultiSelect = !!oEvent.getSource().data("multi");
				this.oDialogaddstoretype.setMultiSelect(bMultiSelect);
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

				if (lengthCounter > 11) {
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
					oEvent.oSource.oParent.byId("addstoreinputid_value_PlantExtension").setTokens(TokensArr);
					// oEvent.oSource.oParent.byId("addstoreinputid_value_ReqNewMat").setValue(selectedAddStorevalue);
					// oEvent.oSource.oParent.byId("addstoreinputid_value_ReqNewMat").setDescription(selectedAddStore.descr);	
				}

			}
		/*changed by udit*/
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
			oModel.read("/ZC_MM_GET_DOM_VAL(p_domain='SERLV')/Set", null, null, true, function (oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("SerialLevelJsonModel").setData(oData1);
			}, function (oError) {
				debugger;
				sap.m.MessageBox.error(" Data fetch failed");
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
			oEvent.oSource.oParent.byId("idseriallevelinput_value_PlantExtension").setValue(selectedSerialLevel.value);
			oEvent.oSource.oParent.byId("idseriallevelinput_value_PlantExtension").setDescription(selectedSerialLevel.text);
				/*change by Udit*/
			oEvent.oSource.oParent.byId("idseriallevelinput_value_PlantExtension").setValueState("None");

			/*end*/
			/*changed by udit*/
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
			oModel.read("ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'", null, null, true, function (oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("AutSerialNoJsonModel").setData(oData1);
			}, function (oError) {
				debugger;
				sap.m.MessageBox.error(" Data fetch failed");
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
		onPlantValueHelpPressedPlantExtension: function (oEvent) {
			debugger;
				/*added by udit*/
		/*	this.getView().getModel("oPlantModelnewmat").refresh();*/
			/*end*/
			busyDialog.open();
			// that = this;
			var oModel = that.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'WERKS' and VALUE eq '" + oSearchController.Matnr + "'", null, null, true, function (
				oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("oPlantModelnewmat").setData(oData1);
				busyDialog.close();
			}, function (oError) {
				debugger;
				busyDialog.close();
				sap.m.MessageBox.error(" Data fetch failed");
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
			oEvent.oSource.oParent.byId("idplantinput_value_PlantExtension").setValue(selectedPlant.VALUE);
			oControllerObjPlantExtension.selectedPlant = selectedPlant.VALUE;
			oEvent.oSource.oParent.byId("idplantinput_value_PlantExtension").setValueState("None");
			oEvent.oSource.oParent.byId("idplantinput_value_PlantExtension").setDescription(selectedPlant.DESC);
			/*changed by udit*/
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
		onprofitcenterValueHelpPressedPlantExtension: function (oEvent) {
			debugger;
			// that = this;
			if (oControllerObjPlantExtension.selectedPlant == "") {
				sap.m.MessageBox.error("Please select Plant first");
			} else {
				busyDialog.open();
				var that = this;
				var oModel = that.getOwnerComponent().getModel("oDataModelSP");
				var costcenter = that.getView().byId("idinputcostcenter_value_PlantExtension").getValue();
				//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
				// oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and VALUE eq '" + oControllerObjPlantExtension.selectedPlant + "'", null, null, true,
				/*oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and DESC eq '" + oControllerObjPlantExtension.selectedPlant +
					"'and VALUE eq '" + oControllerObjPlantExtension.selectedCostCenter + "'", null, null, true,*/
					oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and DESC eq '" + oControllerObjPlantExtension.selectedPlant +
					"'and VALUE eq '" + costcenter + "'", null, null, true,
					function (oData1, oResponse) {
						debugger;
						that.getOwnerComponent().getModel("oProfitcenterJSONModel").setData(oData1);
						busyDialog.close();
					},
					function (oError) {
						debugger;
						busyDialog.close();
						sap.m.MessageBox.error(" Data fetch failed");
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
			oEvent.oSource.oParent.byId("idinputprofitcentre_value_PlantExtension").setValue(selectedProfitCenter.VALUE);
			oEvent.oSource.oParent.byId("idinputprofitcentre_value_PlantExtension").setDescription(selectedProfitCenter.DESC);
			oEvent.oSource.oParent.byId("idinputprofitcentre_value_PlantExtension").setValueState("None");
			/*changed by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/
			
		},
		onliveChangeProfitCenterField : function (oEvent) {
			debugger;
				var that = this;
				
				/*var plant = that.getView().byId("idplantinput_value_ReqNewMat").getValue();*/
				var profitcenter = that.getView().byId("idinputprofitcentre_value_PlantExtension").getValue();
				/*var costcenter = that.getView().byId("idinputcostcenter_value_ReqNewMat").getValue();*/
				if(profitcenter==""){
					that.getView().byId("idinputprofitcentre_value_PlantExtension").setDescription("");
				}
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
			var that = this;
			var plant = this.getView().byId("idplantinput_value_PlantExtension").getValue();
			var profitcenter = this.getView().byId("idinputprofitcentre_value_PlantExtension").getValue();
			var oModel = that.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
			// /ET_CHAR_VALUESet?$filter=FIELD eq 'PRCTR' and DESC eq '"+plant+"' and VALUE eq '<Cost Center>' and DESC eq '"+profitcenter+"'

			//		oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'KOSTL' and VALUE eq '" + oControllerObjPlantExtension.selectedPlant + "'", null,null, true,
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
			/*	var oModel = that.getOwnerComponent().getModel("oDataModelConfig");
				//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'
				oModel.read("/ZC_MM_GET_CONFIG(p_appl='SPARE_PART'%2Cp_field='KOSTL')/Set", null, null, true, function (oData1, oResponse) {
					debugger;
					that.getOwnerComponent().getModel("oCostcenterJsonModel").setData(oData1);
					busyDialog.close();
				}, function (oError) {
					debugger;
					busyDialog.close();
					sap.m.MessageBox.error(" Data fetch failed");
				});*/
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
			oEvent.oSource.oParent.byId("idinputcostcenter_value_PlantExtension").setValue(selectedCostCenter.VALUE);
			oControllerObjPlantExtension.selectedCostCenter = selectedCostCenter.VALUE;
			oEvent.oSource.oParent.byId("idinputcostcenter_value_PlantExtension").setDescription(selectedCostCenter.DESC);
			oEvent.oSource.oParent.byId("idinputcostcenter_value_PlantExtension").setValueState("None");
				/*changed by udit*/
			oEvent.getSource().getBinding("items").filter([]);
			/*end*/
		},
		onliveChangeCostCenterField : function (oEvent) {
			debugger;
				var that = this;
				
				/*var plant = that.getView().byId("idplantinput_value_ReqNewMat").getValue();*/
				/*var profitcenter = that.getView().byId("idinputprofitcentre_value_ReqCopyMat").getValue();*/
				var costcenter = that.getView().byId("idinputcostcenter_value_PlantExtension").getValue();
				if(costcenter==""){
					that.getView().byId("idinputcostcenter_value_PlantExtension").setDescription("");
				}
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
			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'MSEHI'", null, null, true, function (oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("oUnitOfIssueModel").setData(oData1);
				busyDialog.close();
			}, function (oError) {
				debugger;
				busyDialog.close();
				sap.m.MessageBox.error(" Data fetch failed");
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
			oEvent.oSource.oParent.byId("idinputuoi_value_PlantExtension").setValue(selectedUnitOfIssue.VALUE);
			oEvent.oSource.oParent.byId("idinputuoi_value_PlantExtension").setDescription(selectedUnitOfIssue.DESC);
			oEvent.oSource.oParent.byId("idinputuoi_value_PlantExtension").setValueState("None");
			oControllerObjPlantExtension.byId("idinputconversion_value1_PlantExtension").setDescription(selectedUnitOfIssue.VALUE);
				/*changed by udit*/
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
			oModel.read("/ET_CHAR_VALUESet?$filter=FIELD eq 'SERAIL'", null, null, true, function (oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("oSerialNoJsonModel").setData(oData1);
				busyDialog.close();
			}, function (oError) {
				debugger;
				busyDialog.close();
				sap.m.MessageBox.error(" Data fetch failed");
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
			oEvent.oSource.oParent.byId("idinputserialnoprof_value_PlantExtension").setValue(selectedSerialNo.VALUE);
			oEvent.oSource.oParent.byId("idinputserialnoprof_value_PlantExtension").setDescription(selectedSerialNo.DESC);
			oEvent.oSource.oParent.byId("idinputserialnoprof_value_PlantExtension").setValueState("None");
				/*changed by udit*/
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
			oModel.read("/ZC_MM_GET_DOM_VAL(p_domain='ZMM_CRIT_PART_DOM')/Set", null, null, true, function (oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("oCriticalPartJSONModel").setData(oData1);
				busyDialog.close();
			}, function (oError) {
				debugger;
				busyDialog.close();
				sap.m.MessageBox.error(" Data fetch failed");
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
			oEvent.oSource.oParent.byId("idinputcriticalpart_value_PlantExtension").setValue(selectedCriticalPart.value);
			oEvent.oSource.oParent.byId("idinputcriticalpart_value_PlantExtension").setDescription(selectedCriticalPart.text);
			oEvent.oSource.oParent.byId("idinputcriticalpart_value_PlantExtension").setValueState("None");
				/*changed by udit*/
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
			oModel.read("/ZC_MM_GET_DOM_VAL(p_domain='ZMM_PERIOD_DOM')/Set", null, null, true, function (oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("oPeriodJSONModel").setData(oData1);
				busyDialog.close();
			}, function (oError) {
				debugger;
				busyDialog.close();
				sap.m.MessageBox.error(" Data fetch failed");
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
			oEvent.oSource.oParent.byId("idinputperiod_value_PlantExtension").setValue(selectedPeriod.value);
			oEvent.oSource.oParent.byId("idinputperiod_value_PlantExtension").setDescription(selectedPeriod.text);
			oEvent.oSource.oParent.byId("idinputperiod_value_PlantExtension").setValueState("None");
				/*changed by udit*/
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
		/*onSelectSubClassBtnPressNewMat:function(oEvent){
			debugger;
			var appController = sap.ui.controller("z_app_spare_parts.z_spare_parts1.controller.search");
			appController.onSelectSubClassBtnPress();
		}*/
		onSelectSubClassBtnPressPlantExtension: function (oEvent) {
			debugger;
			// that = this;
			that.ClassificationTreeJSON = {
				results: []
			};
			var oSubClass = "TEST_SP";
			SubClassContent.loadJSONClassificationTree(oSubClass, oControllerObjPlantExtension);
			var oView = this.getView();
			this.SubClassDialogPlantExtension = oView.byId("SubClassDialogid");
			if (!this.SubClassDialogPlantExtension) {
				// create dialog via fragment factory
				this.SubClassDialogPlantExtension = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
					this.SubClassDialogPlantExtension);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.SubClassDialogPlantExtension);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/
				this.SubClassDialogPlantExtension.attachConfirm(this.onSubClasshandleConfirm);
				this.SubClassDialogPlantExtension.attachCancel(this.onSubClasshandleClose);
			}
			this.SubClassDialogPlantExtension.open();
		},
		onSubClasshandleConfirm: function (oEvent) {
			//on press select SUb class for sub class level
			debugger;
			//	var oControllerObjPlantExtension = this;
			var selectedSubClass = oEvent.getParameters().selectedItem.getBindingContext("SubClassJsonModel").getObject().CLASS; // SubClassContent.loadJSON_Content_ClassificationTree_NewMaterial(oEvent, selectedSubClass, oControllerObjPlantExtension);
		},
		onSelectValidateClassBtnPressPlantExtension: function (oEvent) {
			debugger;
			ValidateClassificationTree.ValidateClassificationTreeInfo(oEvent, oControllerObjPlantExtension);
		},
		onPCNValueHelppress: function (oEvent) {
			debugger;
			busyDialog.open();
			// this.onButtonPress();
			var oModel = this.getOwnerComponent().getModel("oDataModelPCN");
			var that = this;
			oModel.read("/ZC_MM_PCN_LIST(p_appl='SPARE_PART')/Set", null, null, true, function (oData1, oResponse) {
				debugger;
				that.getOwnerComponent().getModel("PCNJsonModel").setData(oData1);
				busyDialog.close();
			}, function (oError) {
				debugger;
				busyDialog.close();
				sap.m.MessageBox.error(" Data fetch failed");
			});
			//end service consumption
			var oView = this.getView();
			this.PCNdialog = oView.byId("PCNDialog");
			if (!this.PCNdialogPlantExtension) {
				// create dialog via fragment factory
				this.PCNdialogPlantExtension = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.PCNdialog", this.PCNdialogPlantExtension);
				this.PCNdialogPlantExtension.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.PCNdialogPlantExtension);
				this.PCNdialogPlantExtension.attachSearch(this.onhandleSearchPCN);
				this.PCNdialogPlantExtension.attachCancel(this.onCancelPressPCN);
				this.PCNdialogPlantExtension.attachConfirm(this.onhandleConfirmPCN);
				this.PCNdialogPlantExtension.attachLiveChange(this.onlivechangePCN);
			}
			this.PCNdialogPlantExtension.open();
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
			oEvent.oSource.oParent.byId("idinputpcn_value_PlantExtension").setValue(selectedPCN.pcn);
			oEvent.oSource.oParent.byId("idinputpcn_value_PlantExtension").setDescription(selectedPCN.description);
			oEvent.oSource.oParent.byId("idinputpcn_value_PlantExtension").setValueState("None");
			
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
			//var numbers = /^[1-9]+$/;
			//now zero can also be placed afetr a digit like 10, 100, 200 but but like 01 added by Udit
			var numbers = /^[1-9][0-9]*$/;
			if (oEvent.getSource().getValue().valueOf().match(numbers) == null) {

				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Only Numbers/Intergers allowed");
				oEvent.getSource().setValue("");
				oControllerObjPlantExtension.reviewFlag_PlantExtension = false;
			} else {
				oEvent.getSource().setValueState("None");
				oControllerObjPlantExtension.reviewFlag_PlantExtension = true;
			}

		},
		inputquantityperbatchliveChange: function (oEvent) {
			debugger;
			var numbers = /^[0-9]+$/;
			if (oEvent.getSource().getValue().valueOf().match(numbers) == null) {

				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Only Numbers/Intergers allowed");
				oEvent.getSource().setValue("");
				oControllerObjPlantExtension.reviewFlag_PlantExtension = false;
			} else {
				oEvent.getSource().setValueState("None");
				oControllerObjPlantExtension.reviewFlag_PlantExtension = true;
			}

		},
		onConversionInput: function (oEvent) {
			debugger;
			var numbers = /^[0-9]+$/;
			if (oEvent.getSource().getValue().valueOf().match(numbers) == null) {

				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Only Numbers/Intergers allowed");
				oEvent.getSource().setValue("");
				oControllerObjPlantExtension.reviewFlag_PlantExtension = false;
			} else {
				oEvent.getSource().setValueState("None");
				oControllerObjPlantExtension.reviewFlag_PlantExtension = true;
			}

		},
		/**
		 *@memberOf z_app_spare_parts.z_spare_parts1.controller.Plantextension
		 */
	});
});
var that;
var selectedPlant = "";
var busyDialog = new sap.m.BusyDialog();
var reviewFlag_PlantExtension;
var oControllerObjPlantExtension;
var aUploadDataSet = {
	"results": []
};