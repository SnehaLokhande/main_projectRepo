sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"z_app_spare_parts/z_spare_parts1/util/SubClassContent",
	"z_app_spare_parts/z_spare_parts1/util/SearchByClassification",
	// "sap/m/BusyDialog"

], function (Controller, MessageBox, Filter, SubClassContent, SearchByClassification) {
	// "use strict";
	return Controller.extend("z_app_spare_parts.z_spare_parts1.controller.search", {
		onInit: function () {
			/*	this.onButtonPress();*/
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			debugger;
			var oView = this.getView();
			that = this;
			oSearchController = this;
			var oView = this.getView();
			oSearchController.ClassificationTreeJSON = {
				results: []
			};
			oSearchController.ClassificationTreeJSONFlatStrc = {
				results: []
			};
			oSearchController.setNoOEMFLAG = "";
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("search").attachPatternMatched(this.loadInitDataSearch, this);

			// var Materialtable = oSearchController.getView().byId("LineItemsSmartTable");
			// oSearchController.getView().getContent()[0].setContent(Materialtable);
			// oSearchController.getView().byId("LineItemsSmartTable").setVisible(true);
			// oSearchController.NewValueFlag = "";
		},
		loadInitDataSearch: function (oEvent) {
			z_app_spare_parts.z_spare_parts1.util.SubClassContent.loadHeaderClass(oSearchController);
			if (oSearchController.ClassificationTreeJSON) {
				if (oSearchController.ClassificationTreeJSON.results.length > 1) {

				} else {
					var oSubClass = "SP_GIMM"
					var ClassificationTree = this.getView().byId("idIconTabBarClassificationTree")
					ClassificationTree.destroyItems();
					SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
				}
			} else {
				var oSubClass = "SP_GIMM"
				var ClassificationTree = this.getView().byId("idIconTabBarClassificationTree")
				ClassificationTree.destroyItems();
				SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
			}

		},
		onButtonPressPCN: function (evt) {
			debugger;

		},
		onRefreshBtnPressMaterial: function (oEvent) {
			debugger;
			this.getView().byId("idnumberOEM").setValue("");
			/*this.getView().byId("pcninputid").setValue("");
			this.getView().byId("pcninputid").setDescription("");*/
			this.getView().byId("clusterinputid").setValue("");
			this.getView().byId("Matnrinputid").setValue("");
			this.getView().byId("MaterialDescriptioninputid").setValue("");
			this.getOwnerComponent().getModel("tableModel").setData("");
			var oTable = this.getView().byId("LineItemsSmartTable");
			oTable.clearSelection();
			var RequestCopyMaterialBtn = oSearchController.getView().byId("idRequestCopyMaterialBtn");
			var PlantExtensionBtn = oSearchController.getView().byId("idPlantExtensionBtn");
			RequestCopyMaterialBtn.setVisible(false);
			PlantExtensionBtn.setVisible(false);
		},
		onRefreshBtnPressClassTree: function (oEvent) {
			debugger;

			oSearchController.getOwnerComponent().getModel("tableModelSearchByClassTree").setData("");
			var oTable = oSearchController.getView().byId("LineItemsSmartTableSearchByClassTree");
			oTable.destroyColumns();
			// oTable.destroyRows();
			oSearchController.ClassificationTreeJSON = {
				results: []
			};
			oSearchController.ClassificationTreeJSONFlatStrc = {
				results: []
			};

			oSearchController.Matnr = "";
			oSearchController.Plant = "";
			var oTable = this.getView().byId("LineItemsSmartTableSearchByClassTree");
			oTable.clearSelection();
			var RequestCopyMaterialBtn = oSearchController.getView().byId("idRequestCopyMaterialBtn");
			var PlantExtensionBtn = oSearchController.getView().byId("idPlantExtensionBtn");
			RequestCopyMaterialBtn.setVisible(false);
			PlantExtensionBtn.setVisible(false);

			var oSubClass = "SP_GIMM"
			var ClassificationTree = this.getView().byId("idIconTabBarClassificationTree")
			ClassificationTree.destroyItems();
			SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
		},
		handleTitleSelectorPress: function (oEvent) {
			debugger;
			var _oPopover = this._getSearchCriteriaResponsivePopover();
			_oPopover.openBy(oEvent.getParameter("domRef"));
		},
		_getSearchCriteriaResponsivePopover: function () {
			debugger;
			if (!this._oSearchCriteriaPopover) {
				debugger;
				this._oSearchCriteriaPopover = new sap.m.ResponsivePopover({
					showHeader: false,
					placement: "Bottom",
					content: [new sap.m.SelectList({
						selectedKey: "MATERIAL",
						selectionChange: [
							this.handleSearchMode,
							this
						],
						items: [
							new sap.ui.core.Item({
								key: "MATERIAL",
								text: "Search By OEM Part Number / Part Number"
							}),
							new sap.ui.core.Item({
								key: "MATERIALNUM",
								text: "Search By Material Number"
							}),
							new sap.ui.core.Item({
								key: "MATERIALDESC",
								text: "Search By Material Description"
							}),
							new sap.ui.core.Item({
								key: "TREE",
								text: "Search By Classification Tree"
							})
						]
					})]
				});
			}
			return this._oSearchCriteriaPopover;
		},
		handleSearchMode: function (oEvent) {
			debugger;
			// changes made by Udit to close Pop over
			var _oPopover = this._getSearchCriteriaResponsivePopover();
			_oPopover.close();
				/*that._oPopover.close();*/
				// end
			var view = this.getView();
			view.byId("ObjectHeaderid").setTitle(oEvent.getSource().getSelectedItem().getText());
			// oSearchController.getView().getContent()[0].destroyContent();
			
			//For search by OEM Part Number
			if (oEvent.getSource().getSelectedKey() === "MATERIAL") {
				// selected key is MATERIAL
				view.byId("TextSearch").setVisible(true);
				
				view.byId("idOEMLabel").setVisible(true);
				view.byId("idnumberOEM").setVisible(true);
				
				view.byId("idMatnrLabel").setVisible(false);
				view.byId("Matnrinputid").setVisible(false);
				
				view.byId("idMatDescLabel").setVisible(false);
				view.byId("MaterialDescriptioninputid").setVisible(false);
				
				view.byId("clusterlabelid").setVisible(true);
				view.byId("clusterinputid").setVisible(true);
				
				
				view.byId("LineItemsSmartTable").setVisible(true);
				view.byId("LineItemsSmartTableSearchByClassTree").setVisible(false);
				view.byId("TreeSearch").setVisible(false);
				view.byId("tabletitle").setVisible(true);
				view.byId("tabletitleMatNum").setVisible(false);
				view.byId("tabletitleMatDesc").setVisible(false);
				
				oSearchController.getOwnerComponent().getModel("tableModelSearchByClassTree").setData("");
				var oTable = oSearchController.getView().byId("LineItemsSmartTableSearchByClassTree");
				oTable.destroyColumns();
				// oTable.destroyRows();
				oSearchController.ClassificationTreeJSON = {
					results: []
				};
				oSearchController.ClassificationTreeJSONFlatStrc = {
					results: []
				};
				var oSubClass = "SP_GIMM"
				var ClassificationTree = oSearchController.getView().byId("idIconTabBarClassificationTree")
				ClassificationTree.destroyItems();
				SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
				
				// to clear searched values from the table
					var oTable = this.getView().byId("LineItemsSmartTable");
					oTable.clearSelection();
						oSearchController.getOwnerComponent().getModel("tableModel").setData("");
					this.getView().byId("Matnrinputid").setValue("");	
					this.getView().byId("MaterialDescriptioninputid").setValue("");
					this.getView().byId("idnumberOEM").setValue("");
					this.getView().byId("clusterinputid").setValue("");
				
				//For search by Material Number
			} else if (oEvent.getSource().getSelectedKey() === "MATERIALNUM") {
				// selected key is MATERIAL
				view.byId("TextSearch").setVisible(true);
				
					view.byId("idOEMLabel").setVisible(false);
					view.byId("idnumberOEM").setVisible(false);
					
					view.byId("idMatnrLabel").setVisible(true);
					view.byId("Matnrinputid").setVisible(true);
				
					view.byId("idMatDescLabel").setVisible(false);
					view.byId("MaterialDescriptioninputid").setVisible(false);
					
					view.byId("clusterlabelid").setVisible(false);
					view.byId("clusterinputid").setVisible(false);
					
					view.byId("tabletitle").setVisible(false);
					view.byId("tabletitleMatNum").setVisible(true);
					view.byId("tabletitleMatDesc").setVisible(false);
				
				
				view.byId("LineItemsSmartTable").setVisible(true);
				view.byId("LineItemsSmartTableSearchByClassTree").setVisible(false);
				view.byId("TreeSearch").setVisible(false);
				
				view.byId("tabletitleMatNum").setVisible(true);
				oSearchController.getOwnerComponent().getModel("tableModelSearchByClassTree").setData("");
				var oTable = oSearchController.getView().byId("LineItemsSmartTableSearchByClassTree");
				oTable.destroyColumns();
				// oTable.destroyRows();
				oSearchController.ClassificationTreeJSON = {
					results: []
				};
				oSearchController.ClassificationTreeJSONFlatStrc = {
					results: []
				};
				var oSubClass = "SP_GIMM"
				var ClassificationTree = oSearchController.getView().byId("idIconTabBarClassificationTree")
				ClassificationTree.destroyItems();
				SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
				
				// to clear searched values from the table
					var oTable = this.getView().byId("LineItemsSmartTable");
					oTable.clearSelection();
						oSearchController.getOwnerComponent().getModel("tableModel").setData("");
							this.getView().byId("Matnrinputid").setValue("");	
					this.getView().byId("MaterialDescriptioninputid").setValue("");
					this.getView().byId("idnumberOEM").setValue("");
					this.getView().byId("clusterinputid").setValue("");

			}
			
			
			//For Search By Material Description
			else if (oEvent.getSource().getSelectedKey() === "MATERIALDESC") {
				// selected key is MATERIAL
				view.byId("TextSearch").setVisible(true);
				
					view.byId("idOEMLabel").setVisible(false);
					view.byId("idnumberOEM").setVisible(false);
					
					view.byId("idMatnrLabel").setVisible(false);
					view.byId("Matnrinputid").setVisible(false);
				
					view.byId("idMatDescLabel").setVisible(true);
					view.byId("MaterialDescriptioninputid").setVisible(true);
					
					view.byId("clusterlabelid").setVisible(false);
					view.byId("clusterinputid").setVisible(false);
					
					view.byId("tabletitle").setVisible(false);
					view.byId("tabletitleMatNum").setVisible(false);
					view.byId("tabletitleMatDesc").setVisible(true);
				
				view.byId("LineItemsSmartTable").setVisible(true);
				view.byId("LineItemsSmartTableSearchByClassTree").setVisible(false);
				view.byId("TreeSearch").setVisible(false);
				view.byId("tabletitleMatDesc").setVisible(true);
				oSearchController.getOwnerComponent().getModel("tableModelSearchByClassTree").setData("");
				var oTable = oSearchController.getView().byId("LineItemsSmartTableSearchByClassTree");
				oTable.destroyColumns();
				// oTable.destroyRows();
				oSearchController.ClassificationTreeJSON = {
					results: []
				};
				oSearchController.ClassificationTreeJSONFlatStrc = {
					results: []
				};
				var oSubClass = "SP_GIMM"
				var ClassificationTree = oSearchController.getView().byId("idIconTabBarClassificationTree")
				ClassificationTree.destroyItems();
				SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
				
				// to clear searched values from the table
					var oTable = this.getView().byId("LineItemsSmartTable");
					oTable.clearSelection();
						oSearchController.getOwnerComponent().getModel("tableModel").setData("");
							this.getView().byId("Matnrinputid").setValue("");	
					this.getView().byId("MaterialDescriptioninputid").setValue("");
					this.getView().byId("idnumberOEM").setValue("");
					this.getView().byId("clusterinputid").setValue("");

			}
			
			//For Search By classification Tree
			else {
				// code added to solve the icon tab duplicate issue udit kandh
					oSearchController.getOwnerComponent().getModel("tableModelSearchByClassTree").setData("");
				var oTable = oSearchController.getView().byId("LineItemsSmartTableSearchByClassTree");
				oTable.destroyColumns();
				// oTable.destroyRows();
				oSearchController.ClassificationTreeJSON = {
					results: []
				};
				oSearchController.ClassificationTreeJSONFlatStrc = {
					results: []
				};
					var oSubClass = "SP_GIMM";
			var ClassificationTree = this.getView().byId("idIconTabBarClassificationTree");
			ClassificationTree.destroyItems();
			SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
			//end udit kandh
				
				
				
				// selected key is TREE
				view.byId("TextSearch").setVisible(false);
				view.byId("LineItemsSmartTable").setVisible(false);
				view.byId("LineItemsSmartTableSearchByClassTree").setVisible(true);
				view.byId("TreeSearch").setVisible(true);
				oSearchController.getView().byId("idnumberOEM").setValue("");
				oSearchController.getView().byId("Matnrinputid").setValue("");
				oSearchController.getView().byId("MaterialDescriptioninputid").setValue("");
			/*	oSearchController.getView().byId("pcninputid").setValue("");
				oSearchController.getView().byId("pcninputid").setDescription("");*/
				oSearchController.getView().byId("clusterinputid").setValue("");
				oSearchController.getOwnerComponent().getModel("tableModel").setData("");
				
				
				
			
			
			}
			var RequestCopyMaterialBtn = oSearchController.getView().byId("idRequestCopyMaterialBtn");
			var PlantExtensionBtn = oSearchController.getView().byId("idPlantExtensionBtn");
			RequestCopyMaterialBtn.setVisible(false);
			PlantExtensionBtn.setVisible(false);

		},
		_onButtonPress: function (oEvent) {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantextension");
		},
		onPCNbuttonpress: function (oEvent) {
			debugger;
			var BusyDialog = new sap.m.BusyDialog();
			BusyDialog.open();
			// this.onButtonPress();
			var oModel = this.getOwnerComponent().getModel("oDataModelPCN");
			var that = this;
			oModel.read("/ZC_MM_PCN_LIST(p_appl='SPARE_PART')/Set", null, null, true,
				function (oData1, oResponse) {
					debugger;
					BusyDialog.close();
					that.getOwnerComponent().getModel("PCNJsonModel").setData(oData1);
				},
				function (oError) {
					debugger;
					BusyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.PCNdialog = oView.byId("PCNDialog");

			if (!this.PCNdialog) {
				// create dialog via fragment factory
				this.PCNdialog = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.PCNdialog", this.PCNdialog);
				this.PCNdialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.PCNdialog);
				this.PCNdialog.attachSearch(this.onhandleSearchPCN);
				this.PCNdialog.attachCancel(this.onCancelPressPCN);
				this.PCNdialog.attachConfirm(this.onhandleConfirmPCN);
				this.PCNdialog.attachLiveChange(this.onlivechangePCN);

			}
			this.PCNdialog.open();
		},

		onhandleConfirmPCN: function (oEvent) {
			debugger;
			var selectPCN = oEvent.getParameters().selectedItem.getBindingContext("PCNJsonModel").getObject();
			var selecteddesc = selectPCN.description;
			window.selectedpcn = selectPCN.pcn;
			oSearchController.getView().byId("pcninputid").setValue(window.selectedpcn);
			oSearchController.getView().byId("pcninputid").setDescription(selecteddesc);
			// that.getView().getContent()[0].getTitle().getHeading().setText("PCN : " + selecteddesc + "(" + selectedpcn + ")");
			// var selectPCN = oEvent.getParameters().selectedItem.getBindingContext("PCNJsonModel").getObject();
			// var selecteddesc = selectPCN.description;
			// window.selectedpcn = selectPCN.pcn;
			// that.getView().getContent()[0].getTitle().getHeading().setText("PCN : " + selecteddesc + "(" + selectedpcn + ")");

			//	var title = oEvent.mParameters.selectedItem.mProperties.title;
		},
		onhandleSearchPCN: function (oEvent) {
			debugger;
			/*	var sValue = oEvent.getParameter("value");
				var oFilter = new Filter("Matkl", sap.ui.model.FilterOperator.Contains, sValue);
				var oBinding = oEvent.getSource().getBinding("items");
				oBinding.filter([oFilter]);*/
			var searchValue = oEvent.getParameter('value');
			var filterPCN = new sap.ui.model.Filter("pcn", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterPCNDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterPCN);
			filters.push(filterPCNDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onCancelPressPCN: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);

		},
		onlivechangePCN: function (oEvent) {
			debugger;
			var oFilter = [];
			var sValue = oEvent.getParameter("value");
			var filters = [new Filter("pcn", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("description", sap.ui.model.FilterOperator.Contains, sValue)
			];
			oFilter = new sap.ui.model.Filter(filters, false);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		/**
		 *@memberOf z_app_spare_parts.z_spare_parts1.controller.search
		 */

		onCancelPressPCN: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);

		},
		actionPlantExtension: function (oEvent) {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantextension");
		},
		actionRequestNewMaterial: function (oEvent) {
			debugger;
			that.ValidateFlag == "";
			oSearchController.ReqNewMatBtnClickFlag = true;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("NewMaterial");

		},
		actionRequestCopyMaterial: function (oEvent) {
			debugger;
			that.ValidateFlag == "";
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RequestCopyMaterial");
		},

		onClusterhelppressed: function (oEvent) {
			var BusyDialog = new sap.m.BusyDialog();
			debugger;
			BusyDialog.open();
			//service consumption for Cluster dialog
			var oDataModel = this.getOwnerComponent().getModel("oDataModelSP");
			//	/sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/ZC_MM_GET_CONFIG(p_appl='SPARE_PARTS',p_field=’PCN’)/Set
			var that = this;
			oDataModel.read("/ET_CLASS_HEADERSet", null, null, true,
				function (oData1, oResponse) {
					debugger;
					oSearchController.getOwnerComponent().getModel("ClusterJsonModel").setData(oData1);
					BusyDialog.close();
				},
				function (oError) {
					debugger;
					BusyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption

			var oView = this.getView();
			this.oDialogCluster = oView.byId("ClusterDialogid");
			if (!this.oDialogCluster) {
				// create dialog via fragment factory
				this.oDialogCluster = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.Clusterdialog", this.oDialogCluster);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(this.oDialogCluster);
				/*	this.oDialog2.attachSearch(this.onhandleSearch);
					this.oDialog2.attachCancel(this.onhandleClose);
					this.oDialog2.attachConfirm(this.onCancelPress);*/

				this.oDialogCluster.attachConfirm(this.onClusthandleConfirm);
				this.oDialogCluster.attachCancel(this.onClusthandleClose);
				this.oDialogCluster.attachLiveChange(this.onlivechangeClust);
				this.oDialogCluster.attachSearch(this.onhandleSearchClust);
			}
			this.oDialogCluster.open();

		},
		onClusthandleConfirm: function (oEvent) {
			debugger;
			var selectPCN = oEvent.getParameters().selectedItem.getBindingContext("ClusterJsonModel").getObject();
			window.SelectedCluster = selectPCN.Class;
			oSearchController.getView().byId("clusterinputid").setValue(selectPCN.Class);

		},
		onClusthandleClose: function (oEvent) {
			debugger;
			oEvent.getSource().getBinding("items").filter([]);
		},
		onhandleSearchClust: function (oEvent) {
			debugger;
			var searchValue = oEvent.getParameter('value');
			var filterClusterVal = new sap.ui.model.Filter("Class", sap.ui.model.FilterOperator.Contains, searchValue);
			var filterClusterDesc = new sap.ui.model.Filter("Descr", sap.ui.model.FilterOperator.Contains, searchValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var filters = new Array();
			filters.push(filterClusterVal);
			filters.push(filterClusterDesc);
			oBinding.filter(new sap.ui.model.Filter(filters, false));
		},
		onlivechangeClust: function (oEvent) {
			debugger;
			var oFilter = [];
			var sValue = oEvent.getParameter("value");
			var filters = [new Filter("Class", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Descr", sap.ui.model.FilterOperator.Contains, sValue)
			];
			oFilter = new sap.ui.model.Filter(filters, false);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		onSelectDynamicSubClassBtnPress: function (oEvent) {
			oSearchController.SubClassDialog = oSearchController.byId("SubClassDialogid");
			if (!oSearchController.SubClassDialog) {
				// create dialog via fragment factory
				oSearchController.SubClassDialog = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog",
					oSearchController.SubClassDialog);
				// connect dialog to view (models, lifecycle)
				oSearchController.addDependent(this.SubClassDialog);
				oSearchController.SubClassDialog.attachConfirm(oSearchController.onDynamicSubClasshandleConfirm);
				oSearchController.SubClassDialog.attachCancel(oSearchController.onSubClasshandleClose);
			}
			oSearchController.SubClassDialog.open();
		},
		onSelectSubClassBtnPress: function (oEvent) { //on press select SUb class for header class
			debugger;
			// var that = this;
			if (!oSearchController.ClassificationTreeJSON) {
				oSearchController.ClassificationTreeJSON = {
					results: []
				};
				oSearchController.ClassificationTreeJSONFlatStrc = {
					results: []
				};
				var oSubClass = "SP_GIMM";
				var ClassificationTree = this.getView().byId("idIconTabBarClassificationTree")
				ClassificationTree.destroyItems();
				SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
				// SubClassContent.loadJSONClassificationTree(oSubClass, oSearchController);
				var oView = this.getView();

				this.SubClassDialog = oView.byId("SubClassDialogid");
				if (!this.SubClassDialog) {
					// create dialog via fragment factory
					this.SubClassDialog = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog", this.SubClassDialog);
					// connect dialog to view (models, lifecycle)
					oView.addDependent(this.SubClassDialog);
					/*	this.oDialog2.attachSearch(this.onhandleSearch);
						this.oDialog2.attachCancel(this.onhandleClose);
						this.oDialog2.attachConfirm(this.onCancelPress);*/
					this.SubClassDialog.attachConfirm(this.onSubClasshandleConfirm);
					this.SubClassDialog.attachCancel(this.onSubClasshandleClose);
				}
				this.SubClassDialog.open();
			} else if (oSearchController.ClassificationTreeJSON.results.length == 0 || oSearchController.ClassificationTreeJSON.results.length ==
				1) {
				oSearchController.ClassificationTreeJSON = {
					results: []
				};
				oSearchController.ClassificationTreeJSONFlatStrc = {
					results: []
				};
				var oSubClass = "SP_GIMM"
					//	SubClassContent.loadJSONClassificationTree(oSubClass, oSearchController);
				var oView = this.getView();
				var ClassificationTree = this.getView().byId("idIconTabBarClassificationTree")
				ClassificationTree.destroyItems();
				SubClassContent.loadReqNewMatJSONClassificationTreeInit(oSearchController);
				this.SubClassDialog = oView.byId("SubClassDialogid");
				if (!this.SubClassDialog) {
					// create dialog via fragment factory
					this.SubClassDialog = sap.ui.xmlfragment(oView.getId(), "z_app_spare_parts.z_spare_parts1.fragments.SubClassdialog", this.SubClassDialog);
					// connect dialog to view (models, lifecycle)
					oView.addDependent(this.SubClassDialog);
					/*	this.oDialog2.attachSearch(this.onhandleSearch);
						this.oDialog2.attachCancel(this.onhandleClose);
						this.oDialog2.attachConfirm(this.onCancelPress);*/
					this.SubClassDialog.attachConfirm(this.onSubClasshandleConfirm);
					this.SubClassDialog.attachCancel(this.onSubClasshandleClose);
				}
				this.SubClassDialog.open();
			} else {
				// 	if(oSearchController.ClassificationTreeJSON.results>0){
				sap.m.MessageBox
					.error(" You have already selected Sub Class");
			}
		},
		onSubClasshandleConfirm: function (oEvent) { //on press select SUb class for sub class level
			debugger;
			// var oSubClass = "SP_GIMM"
			var selectedSubClass = oEvent.getParameters().selectedItem.getBindingContext("SubClassJsonModel").getObject().CLASS;
			SubClassContent.loadJSON_Content_ClassificationTree(oEvent, selectedSubClass, oSearchController);
			// window.sSelectedSubClass = sSelectedObj.Class;
			//	/sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/ZC_MM_GET_CONFIG(p_appl='SPARE_PARTS',p_field=’PCN’)/Set
			// /ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + window.SelectedCluster + "' and PCN eq '" + window.SelectedCluster + "'
			// var that = this;
		},

		onDynamicSubClasshandleConfirm: function (oEvent) {
			debugger;
			var oSubClass = "SP_GIMM"
			SubClassContent.createContent(oEvent, oSubClass, oSearchController);

			// window.sSelectedSubClass = sSelectedObj.Class;
			//	/sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/ZC_MM_GET_CONFIG(p_appl='SPARE_PARTS',p_field=’PCN’)/Set
			// /ET_CLASS_HEADERSet?$expand=ET_CLASS_CHARNav/ET_CHAR_VALUENav,ET_SUB_CLASSNav&$filter=Class eq '" + window.SelectedCluster + "' and PCN eq '" + window.SelectedCluster + "'
			// var that = this;
		},
		// onhandleConfirmCharacteristicValueHelpDialog: function (oEvent,currentChar) {
		// 	debugger;
		// 	var sSelectedValue = oEvent.getParameters().selectedItem.getBindingContext("SubClassJsonModel").getObject().VALUE;

		// },
		onCancelPressCharacteristicValueHelpDialog: function (oEvent) {
			debugger;
		},
		
		//CHANGE BY UDIT
	/*	handleSearch : function (evt) {
				debugger;
		
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}
	
		var list = this.getView().byId("List");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},
	
		onCloseFilterOptionsDialogConfirm: function (oEvent) {
			debugger;
			
		},*/
		//END
		
		
		
		onlivechangeCharValueDialog: function (oEvent) {

			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilter2 = new sap.ui.model.Filter("Desc", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilterWithOr = new sap.ui.model.Filter({
				filters: [oFilter, oFilter2],
				and: false
			});
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilterWithOr]);
		},

		onSearchBtnPressMaterial: function (oEvent) {
			debugger;
			var BusyDialog = new sap.m.BusyDialog();
			BusyDialog.open();
			
			//changes to make the search value into UPPER CASE -Udit Kandh
			var numberOEM = this.getView().byId("idnumberOEM").getValue().toUpperCase();
			
			var Matnrinput = this.getView().byId("Matnrinputid").getValue().toUpperCase();
			var MaterialDescriptioninput = this.getView().byId("MaterialDescriptioninputid").getValue().toUpperCase();
			
			/*var pcninput = this.getView().byId("pcninputid").getValue();*/
			var pcninput = "";
			var clusterinput = this.getView().byId("clusterinputid").getValue().toUpperCase();
			

			// new req 1-2-19 TB
			// var Matnr = = this.getView().byId("Matnrinputid").getValue();
			// var MaterialDescription = this.getView().byId("MaterialDescriptioninputid").getValue();
			// new req 1-2-19 TB

			var oDataModel = this.getOwnerComponent().getModel("oDataModelSP");
			var that = this;
			// /sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_MM_SEARCH_MATSet/?$filter=Value eq '12' and Class eq 'TEST_SP_2' and Pcn eq '<PCN>'
			//	/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/ET_MM_SEARCH_MATSet/?$filter=Value eq '12' and Class eq 'TEST_SP_2'
			oDataModel.read("/ET_MM_SEARCH_MATSet/?$filter=Value eq '" + numberOEM + "'and Class eq '" + clusterinput + "' and Description  eq '" + MaterialDescriptioninput + "' and Material eq '" + Matnrinput + "' and Pcn eq '" +
				pcninput + "'", null, null,
				true,
				function (oData1, oResponse) {
					oSearchController.getOwnerComponent().getModel("tableModel").setData(oData1);
					BusyDialog.close();
				},
				function (oError) {
					debugger;
					BusyDialog.close();
					sap.m.MessageBox
						.error(" Data fetch failed");
				});

			//end service consumption
		},
		onSelectClassificationTreeSearchBtnPress: function (oEvent) {
			debugger;
			SearchByClassification.searchByClassificationTree(oEvent, oSearchController);

		},

		onSelectionSearchtable: function (oEvent) {
			debugger;
			oSearchController.Matnr = "";
			oSearchController.Plant = "";
			oSearchController.OEMPartNum = "";
			var oTable = this.getView().byId("LineItemsSmartTable");
			var selectedRow = oTable.getSelectedIndex(); //there is always only able to select one row
			var RequestCopyMaterialBtn = oSearchController.getView().byId("idRequestCopyMaterialBtn");
			var PlantExtensionBtn = oSearchController.getView().byId("idPlantExtensionBtn");
			if (selectedRow > -1) {
				RequestCopyMaterialBtn.setVisible(true);
				PlantExtensionBtn.setVisible(true);
				oSearchController.Matnr = oEvent.getParameter("rowContext").oModel.getProperty(oEvent.getParameter("rowContext").sPath +
					"/Material");
				oSearchController.Plant = oEvent.getParameter("rowContext").oModel.getProperty(oEvent.getParameter("rowContext").sPath + "/Plant");
				oSearchController.OEMPartNum = oEvent.getParameter("rowContext").oModel.getProperty(oEvent.getParameter("rowContext").sPath + "/Value");
			} else {
				RequestCopyMaterialBtn.setVisible(false);
				PlantExtensionBtn.setVisible(false);
			}
		},
		onSelectionSearchtableClassificationTree: function (oEvent) {
			debugger;
			oSearchController.Matnr = "";
			oSearchController.Plant = "";
			oSearchController.OEMPartNum = "";
			var oTable = this.getView().byId("LineItemsSmartTableSearchByClassTree");
			var selectedRow = oTable.getSelectedIndex(); //there is always only able to select one row
			var RequestCopyMaterialBtn = oSearchController.getView().byId("idRequestCopyMaterialBtn");
			var PlantExtensionBtn = oSearchController.getView().byId("idPlantExtensionBtn");
			if (selectedRow > -1) {
				RequestCopyMaterialBtn.setVisible(true);
				PlantExtensionBtn.setVisible(true);
				oSearchController.Matnr = oEvent.getParameter("rowContext").oModel.getProperty(oEvent.getParameter("rowContext").sPath +
					"/Material");
				oSearchController.Plant = oEvent.getParameter("rowContext").oModel.getProperty(oEvent.getParameter("rowContext").sPath + "/Plant");
				oSearchController.OEMPartNum = oEvent.getParameter("rowContext").oModel.getProperty(oEvent.getParameter("rowContext").sPath + "/Value");
			} else {
				RequestCopyMaterialBtn.setVisible(false);
				PlantExtensionBtn.setVisible(false);
			}
			//columns binding new TB start
			oTable.bindColumns("columns>/UserColumnSettingCollection(Username='" + this.getOwnerComponent().getPortalUser() + "',TableName='" +
				this.constant.TABLE_SETTING_KEY + "')/TableColumn",
				function (sId, oContext) {
					debugger;
					var sColumnID = oContext.getObject().columnKey;
					var sVisible = oContext.getObject().visible;
					var oValueTemplate = "";
					//CR373 PM TM Deletion flag
					if (sColumnID === "DeleteFlag") {
						oValueTemplate = new sap.m.ObjectStatus({
							text: {
								parts: [{
										path: "DeleteFlag"
									}, //PM
								],
								formatter: oController.DeletionFlagSelectedFormatter
							},
							state: {
								parts: [{
									path: "PurRelease"
								}, {
									path: "TechRelease"
								}],
								//						path : "PurRelease",		//pur release
								formatter: oController.purReleaseFormatter
							}, //end of CR 280 Tanvi Borkar 9.6.17
						})
					} else {
						oValueTemplate = new sap.m.ObjectStatus({
							text: {
								path: sColumnID
							},
							state: {
								parts: [{
									path: "PurRelease"
								}, {
									path: "TechRelease"
								}],
								//						path : "PurRelease",		//pur release
								formatter: oController.purReleaseFormatter
							}, //end of CR 280 Tanvi Borkar 9.6.17
						})
					}

					return new sap.ui.table.Column({
						label: new sap.m.Label({
							text: oController.resourceBundle.getText(sColumnID)
						}),
						// flexible: false,
						// resizable: true,
						autoResizable: true,
						width: 'auto',
						customData: [
							new sap.ui.core.CustomData({
								key: "p13nData",
								value: '\\{"columnKey":"' + sColumnID +
									'", "sortProperty":"' + sColumnID + '"\\}'
							})

						],
						sortProperty: sColumnID,
						visible: sVisible,
						//start of CR 280 Tanvi Borkar 9.6.17
						template: oValueTemplate
					});
				});
			//columns binding new TB end	
		}
	});
});
var that;
var oSearchController;