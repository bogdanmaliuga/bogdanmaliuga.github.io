angular.module('myApp', ['angularModalService', 'ngAnimate','ui.bootstrap'])
    .controller('myCtrl', ["$scope", "$http","$filter","ModalService", function($scope, $http,$filter,ModalService) {

        /* Resources */
        //Boghan
        var getOfferDataForEditionPath = "../data/punct.json";
        var yesNoTemplatePath = "../templates/yesno.html";
        var errorTemplatePath = '../templates/error.html'
        var savePath = 'https://easy-energy.herokuapp.com/a/electricityOffer.json';
        var calculatePath = 'http://easy-energy.ovh/calc/a/calculateElectricityOffer.json';
        var requestSourceType = 'editOffer';
        var aviableSellersPath='../data/sellers.json'
       
        // //Get resources
        // var getOfferDataForEditionPath = pageContext + "/a/electricityOffer/" + offerIdForEdition + ".json";
        // //GET offer data
        // var yesNoTemplatePath = pageContext + '/resources/a/electricityCalculator/templates/yesno.jsp';
        // var errorTemplatePath = pageContext + '/resources/a/electricityCalculator/templates/error.jsp';
        // //POST offer data
        // var savePath = pageContext + '/a/electricityOffer.json';
        // //CALCULATE offer
        // var calculatePath = pageContext + '/a/calculateElectricityOffer.json';
        // var aviableSellersPath= pageContext +  '/a/calculateElectricityOffer/availableSellers.json'

        var sourceTypeEditOffer = 'editOffer';
        var sourceNewOffer = 'newOffer';
    
        //Get aviableSellers
        $http({
                method: 'GET',
                url: aviableSellersPath,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(function(response) {
                  $scope.aviableSellers = response.data;

         });


        //GET DATA
        if (requestSourceType == sourceTypeEditOffer) {
            $http({
                method: 'GET',
                url: getOfferDataForEditionPath,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(function(response) {
                $scope.content = response.data;
                
            });
        }
        if (requestSourceType == sourceNewOffer) {
            initNewOffer($scope);
        }

       

        function initNewOffer($scope) {
            $scope.content = {

                "creationDate": new Date(),
                "lastEditionDate": new Date(),
                "companyDTO": {},
                "receiverPointList": [{
                    "receiverPointDescription": "opis punktu odbioru",
                    "tariffCode": "nazwa taryfy",
                    "actualNumberOfZones": 1,
                    "actualZoneList": [{
                        "actualZoneCodeCode": "Strefa 1"
                    }],
                    "invoiceList": [{
                        "orderNumber": null,
                        "documentNumber": "Numer faktury",
                        "periodStart": new Date(),
                        "getPeriodStop": new Date(),
                        "invoiceZoneConsumptionList": [{
                            "actualZoneCode": "Strefa 1",
                            "unitConsumption": 0
                        }]
                    }],
                    "receiverPointOfferCalculation": {
                        "totalConsumptionSummary": {},
                        "actualReceiverPointFees": {
                            "actualTradeFee": 0,
                            "actualZoneFeeList": [{
                                "actualZoneCode": "Strefa 1",
                                "actualUnitPrice": 0
                            }]
                        },
                        "offerParameters": {
                            "proposalContractMonthLength": 0,
                            "defaultProposalTradeFee": 0,
                            "defaultZoneParamsList": [{
                                "actualZoneCode": "Strefa 1",
                                "defaultUnitPrice": 0
                            }],
                            "defaultZoneCodesSameAsActual": false
                        },
                        "proposalSellerList": [{
                            "sellerCode": "Nazwa sprzedawcy",
                            "proposalTradeFee": 0,
                            "sellerTariffPublicationDate": new Date(),
                            "proposalZoneDetailsList": [{
                                "actualZoneCode": "Strefa 1",
                                "sellerMinimalUnitPrice": 0,
                                "proposalUnitPrice": 0,
                                "proposalZoneCode": "Strefa 1 od Nazwa sprzedawcy"
                            }],
                            "receiverPointEstimation": {
                                "sellerCode": "Nazwa sprzedawcy",
                                "receiverPointDataEstimation": {},
                                "receiverPointProvisionList": []
                            }
                        }]
                    }
                }],
                "allReceiverPointsOfferCalculation": null,
                "offerSummaryDTO": {},
                "offerNote": "Comment",
                "offerCalculationPerReceiverPointSet": true
            }
        };

        //POST DATA
        $scope.sendData = function() {
            
           convertDateFromObject();


            $http({
                method: 'POST',
                dataType: 'json',
                url: savePath,
                data: angular.toJson($scope.content),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(response) {
                if (response.errorCode != null) {
                    errorModal(response.errorCode, response.message);
                }
                $scope.content = response;
             
            }).error(function(error) {
                $scope.error = error;
            });
           
        };

        //CALCULATE DATA
        $scope.sendCalculation = function() {

            convertDateFromObject();
            
            $http({
                method: 'POST',
                dataType: 'json',
                url: calculatePath,
                data: angular.toJson($scope.content),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(response) {
                $scope.content = response;
               

            }).error(function(error) {
                if (error.errorCode != null) {errorModal(error.errorCode, error.message);}

                $scope.error = error;
            });
         

        };
        var errorModal = function(errorCode, message) {
            ModalService.showModal({
                templateUrl: errorTemplatePath,
                controller: "ErrorController",
                inputs: {
                    errorCode: errorCode,
                    message: message
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {

                });
            });
        }

        var convertDateFromObject = function() {
            $scope.content.creationDate = +new Date($scope.content.creationDate);
            $scope.content.lastEditionDate = +new Date($scope.content.lastEditionDate);

            angular.forEach($scope.content.receiverPointList, function(receiverPointList) {
                angular.forEach(receiverPointList.invoiceList, function(invoiceList) {
                    invoiceList.periodStart = +new Date(invoiceList.periodStart);
                    invoiceList.getPeriodStop = +new Date(invoiceList.getPeriodStop);
                });

                if ($scope.content.offerCalculationPerReceiverPointSet == true) {
                    angular.forEach(receiverPointList.receiverPointOfferCalculation.proposalSellerList, function(proposalSellerList) {
                        proposalSellerList.sellerTariffPublicationDate = +new Date(proposalSellerList.sellerTariffPublicationDate);
                    });

                } else if ($scope.content.offerCalculationPerReceiverPointSet == false) {

                }

            });

        };

        $scope.changeSettingsCheckbox = function() {
            if ($scope.content.allReceiverPointsOfferCalculation == null) {

                $scope.content.allReceiverPointsOfferCalculation = $scope.content.receiverPointList[0].receiverPointOfferCalculation;
                angular.forEach($scope.content.receiverPointList, function(val) {
                    val.receiverPointOfferCalculation = null;
                })

            } else if ($scope.content.allReceiverPointsOfferCalculation != null) {
                $scope.newMyVar = $scope.content.allReceiverPointsOfferCalculation;
                angular.forEach($scope.content.receiverPointList, function(v) {

                    v.receiverPointOfferCalculation = $scope.newMyVar;

                    $scope.content.allReceiverPointsOfferCalculation = null;
                });
            }
        };

        $scope.changeNameOfZoneCode = function(p, z, x) {

            if ($scope.content.offerCalculationPerReceiverPointSet == true) {

                angular.forEach($scope.content.receiverPointList[p].invoiceList, function(invoiceList) {

                    invoiceList.invoiceZoneConsumptionList[z].actualZoneCode = x;
                });
                $scope.content.receiverPointList[p].receiverPointOfferCalculation.actualReceiverPointFees.actualZoneFeeList[z].actualZoneCode = x;
                $scope.content.receiverPointList[p].receiverPointOfferCalculation.offerParameters.defaultZoneParamsList[z].actualZoneCode = x;

                angular.forEach($scope.content.receiverPointList[p].receiverPointOfferCalculation.proposalSellerList, function(v) {
                    v.proposalZoneDetailsList[z].actualZoneCode = x;

                });
            } else if ($scope.content.offerCalculationPerReceiverPointSet == false) {

                angular.forEach($scope.content.receiverPointList[p].invoiceList, function(invoiceList) {

                    invoiceList.invoiceZoneConsumptionList[z].actualZoneCode = x;
                });
                $scope.content.allReceiverPointsOfferCalculation.actualReceiverPointFees.actualZoneFeeList[z].actualZoneCode = x;
                $scope.content.allReceiverPointsOfferCalculation.offerParameters.defaultZoneParamsList[z].actualZoneCode = x;
                angular.forEach($scope.content.allReceiverPointsOfferCalculation.proposalSellerList, function(v) {
                    angular.forEach(v.proposalZoneDetailsList, function(val) {
                        val.actualZoneCode = x;
                    });

                });
            }

        };

        $scope.addPunctItem = function() {
            if ($scope.content.receiverPointList.length == 0) {
                $scope.content.receiverPointList.push({
                    "actualNumberOfZones": 1,
                    "actualZoneList": [{
                            "actualZoneCodeCode": "Strefa 1"
                        }

                    ],
                    "invoiceList": [{
                        "orderNumber": null,
                        "documentNumber": "FA 1",
                        "periodStart": new Date(),
                        "getPeriodStop": new Date(),
                        "invoiceZoneConsumptionList": [{
                                "actualZoneCode": "Strefa 1",
                                "unitConsumption": 0
                            }

                        ]
                    }],
                    "receiverPointOfferCalculation": {

                        "actualReceiverPointFees": {

                            "actualZoneFeeList": [{
                                "actualZoneCode": "Strefa 1",
                                "actualUnitPrice": 0
                            }]
                        },
                        "offerParameters": {

                            "defaultZoneParamsList": [{
                                "actualZoneCode": "Strefa 1",
                                "defaultUnitPrice": 0
                            }],
                            "defaultZoneCodesSameAsActual": false
                        },
                        "proposalSellerList": [{
                                "sellerTariffPublicationDate": new Date(),
                                "proposalZoneDetailsList": [{
                                        "actualZoneCode": "Strefa 1",
                                        "sellerMinimalUnitPrice": 0,
                                        "proposalUnitPrice": 0,
                                        "proposalZoneCode": "Strefa 1 od "
                                    },

                                ]
                            }

                        ]
                    }
                });

                convertDate();
            } else if ($scope.content.receiverPointList.length >= 1) {
                $scope.newVar = angular.copy($scope.content.receiverPointList[0]);

                $scope.content.receiverPointList.push($scope.newVar);

            }

        };

        $scope.removeOfferRetailer = function(c, p) {
            ModalService.showModal({
                templateUrl: yesNoTemplatePath,
                controller: "YesNoController"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result == true) {
                        if ($scope.content.offerCalculationPerReceiverPointSet == true) {
                            $scope.content.receiverPointList[p].receiverPointOfferCalculation.proposalSellerList.splice(c, 1);
                        } else if ($scope.content.offerCalculationPerReceiverPointSet == false) {
                            $scope.content.allReceiverPointsOfferCalculation.proposalSellerList.splice(c, 1);
                        }
                    }
                });
            });

        };

        $scope.addCalculationOfferPoints = function(b) {
            if ($scope.content.allReceiverPointsOfferCalculation.proposalSellerList.length !== 0) {
                $scope.propZoneDetail = angular.copy($scope.content.allReceiverPointsOfferCalculation.proposalSellerList[0].proposalZoneDetailsList);
                $scope.content.allReceiverPointsOfferCalculation.proposalSellerList.push({
                    "sellerTariffPublicationDate": new Date(),
                    "proposalZoneDetailsList": $scope.propZoneDetail
                });
            } else if ($scope.content.allReceiverPointsOfferCalculation.proposalSellerList.length == 0) {
                $scope.proposalZoneDetailsListForAll = [];
                angular.forEach($scope.content.receiverPointList[0].actualZoneList, function(v) {
                    $scope.proposalZoneDetailsListForAll.push({
                        "actualZoneCode": v.actualZoneCodeCode,
                        "sellerMinimalUnitPrice": 0,
                        "proposalUnitPrice": 0,
                        "proposalZoneCode": v.actualZoneCodeCode + " od"
                    })
                });
                $scope.content.allReceiverPointsOfferCalculation.proposalSellerList.push({
                    "sellerTariffPublicationDate": new Date(),
                    "proposalZoneDetailsList": $scope.proposalZoneDetailsListForAll
                });
                convertDate()
            }

        };

        $scope.addCalculationOffer = function(a) {
            if ($scope.content.receiverPointList[a].receiverPointOfferCalculation.proposalSellerList.length !== 0) {
                $scope.propZoneDetailOffer = angular.copy($scope.content.receiverPointList[a].receiverPointOfferCalculation.proposalSellerList[0].proposalZoneDetailsList);
                $scope.content.receiverPointList[a].receiverPointOfferCalculation.proposalSellerList.push({
                    "sellerTariffPublicationDate": new Date(),
                    "proposalZoneDetailsList": $scope.propZoneDetailOffer
                });
            } else {
                $scope.proposalZoneDetailsListNew = [];
                angular.forEach($scope.content.receiverPointList[a].actualZoneList, function(v) {
                    $scope.proposalZoneDetailsListNew.push({
                        "actualZoneCode": v.actualZoneCodeCode,
                        "sellerMinimalUnitPrice": 0,
                        "proposalUnitPrice": 0,
                        "proposalZoneCode": v.actualZoneCodeCode + " od"
                    })
                });
                $scope.content.receiverPointList[a].receiverPointOfferCalculation.proposalSellerList.push({
                    "sellerTariffPublicationDate": new Date(),
                    "proposalZoneDetailsList": $scope.proposalZoneDetailsListNew
                });
                convertDate();
            }

        };

        $scope.removeReciverPoint = function(z) {
            ModalService.showModal({
                templateUrl: yesNoTemplatePath,
                controller: "YesNoController"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result == true) {
                        $scope.content.receiverPointList.splice(z, 1);
                    }
                });
            });

        };

        $scope.addNumberOfZones = function(z) {
            $scope.num = $scope.content.receiverPointList[0].actualNumberOfZones;
            console.log($scope.num);
            if ($scope.num == 1) {
                $scope.defaultZoneName = 'Strefa 2';
                $scope.defaultProposalZoneCode = 'Strefa 2 od sellerCode';
            } else if ($scope.num == 2) {
                $scope.defaultZoneName = 'Strefa 3';
                $scope.defaultProposalZoneCode = 'Strefa 3 od sellerCode';
            } else if ($scope.num == 3) {
                $scope.defaultZoneName = 'Strefa 4';
                $scope.defaultProposalZoneCode = 'Strefa 4 od sellerCode';
            }

            if ($scope.num >= 1 && $scope.num < 4) {
                // Коли чекбокс тру,тоді для кожного пункту свій окремий лічильник
                if ($scope.content.offerCalculationPerReceiverPointSet == true) {
                    $scope.content.receiverPointList[z].actualNumberOfZones += 1;
                    $scope.content.receiverPointList[z].actualZoneList.push({
                        "actualZoneCodeCode": $scope.defaultZoneName
                    });

                    angular.forEach($scope.content.receiverPointList[z].invoiceList, function(value) {
                        value.invoiceZoneConsumptionList.push({
                            "actualZoneCode": $scope.defaultZoneName,
                            "unitConsumption": 0
                        });
                    });
                    $scope.content.receiverPointList[z].receiverPointOfferCalculation.actualReceiverPointFees.actualZoneFeeList.push({
                        "actualZoneCode": $scope.defaultZoneName,
                        "actualUnitPrice": 0

                    });
                    $scope.content.receiverPointList[z].receiverPointOfferCalculation.offerParameters.defaultZoneParamsList.push({
                        "actualZoneCode": $scope.defaultZoneName,
                        "defaultUnitPrice": 0

                    });

                    angular.forEach($scope.content.receiverPointList[z].receiverPointOfferCalculation.proposalSellerList, function(value) {
                        value.proposalZoneDetailsList.push({
                            "actualZoneCode": $scope.defaultZoneName,
                            "sellerMinimalUnitPrice": 0,
                            "proposalUnitPrice": 0,
                            "proposalZoneCode": $scope.defaultProposalZoneCode
                        });
                    });

                }
                //Коли чекбокс фолс,тоді для всіх пунктів один лічильник
                else if ($scope.content.offerCalculationPerReceiverPointSet == false) {

                    angular.forEach($scope.content.receiverPointList, function(receiverPointList) {
                        receiverPointList.actualNumberOfZones += 1;
                        receiverPointList.actualZoneList.push({
                            "actualZoneCodeCode": $scope.defaultZoneName
                        });
                        angular.forEach(receiverPointList.invoiceList, function(invoiceList) {
                            invoiceList.invoiceZoneConsumptionList.push({
                                "actualZoneCode": $scope.defaultZoneName,
                                "unitConsumption": 0
                            });
                        });
                    });

                    $scope.content.allReceiverPointsOfferCalculation.actualReceiverPointFees.actualZoneFeeList.push({
                        "actualZoneCode": $scope.defaultZoneName,
                        "actualUnitPrice": 0
                    });
                    $scope.content.allReceiverPointsOfferCalculation.offerParameters.defaultZoneParamsList.push({
                        "actualZoneCode": $scope.defaultZoneName,
                        "defaultUnitPrice": 0

                    });

                    angular.forEach($scope.content.allReceiverPointsOfferCalculation.proposalSellerList, function(value) {
                        value.proposalZoneDetailsList.push({
                            "actualZoneCode": $scope.defaultZoneName,
                            "sellerMinimalUnitPrice": 0,
                            "proposalUnitPrice": 0,
                            "proposalZoneCode": $scope.defaultProposalZoneCode
                        });
                    });
                }
            }

        };

        $scope.deleteNumberOfZones = function(z) {

            ModalService.showModal({
                templateUrl: yesNoTemplatePath,
                controller: "YesNoController"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result == true) {

                        $scope.numDel = $scope.content.receiverPointList[0].actualNumberOfZones;

                        if ($scope.numDel > 1 && $scope.numDel <= 4) {
                            // Коли чекбокс тру,тоді для кожного пункту свій окремий лічильник
                            if ($scope.content.offerCalculationPerReceiverPointSet == true) {

                                $scope.content.receiverPointList[z].actualNumberOfZones -= 1;
                                $scope.content.receiverPointList[z].actualZoneList.splice(-1, 1);
                                angular.forEach($scope.content.receiverPointList[z].invoiceList, function(value) {
                                    value.invoiceZoneConsumptionList.splice(-1, 1);
                                });
                                $scope.content.receiverPointList[z].receiverPointOfferCalculation.actualReceiverPointFees.actualZoneFeeList.splice(-1, 1);
                                $scope.content.receiverPointList[z].receiverPointOfferCalculation.offerParameters.defaultZoneParamsList.splice(-1, 1);
                                angular.forEach($scope.content.receiverPointList[z].receiverPointOfferCalculation.proposalSellerList, function(value) {
                                    value.proposalZoneDetailsList.splice(-1, 1);
                                });

                            }
                            // Коли чекбокс фолс,тоді для всіх пунктів один лічильник
                            else if ($scope.content.offerCalculationPerReceiverPointSet == false) {

                                angular.forEach($scope.content.receiverPointList, function(val) {
                                    val.actualNumberOfZones -= 1;
                                    val.actualZoneList.splice(-1, 1);
                                    angular.forEach(val.invoiceList, function(value) {
                                        value.invoiceZoneConsumptionList.splice(-1, 1);
                                    });
                                });

                                $scope.content.allReceiverPointsOfferCalculation.actualReceiverPointFees.actualZoneFeeList.splice(-1, 1);
                                $scope.content.allReceiverPointsOfferCalculation.offerParameters.defaultZoneParamsList.splice(-1, 1);
                                angular.forEach($scope.content.allReceiverPointsOfferCalculation.proposalSellerList, function(value) {
                                    value.proposalZoneDetailsList.splice(-1, 1);
                                });

                            }

                        }
                    }
                });
            });
        };

        $scope.addUse = function(a, b) {
            $scope.myVar = angular.copy($scope.content.receiverPointList[a].invoiceList[0].invoiceZoneConsumptionList);
            angular.forEach($scope.myVar, function(val) {
                val.unitConsumption = 0;
            });

            $scope.content.receiverPointList[a].invoiceList.push({
                "orderNumber": null,
                "documentNumber": "FA 1",
                "periodStart": Date(),
                "getPeriodStop": Date(),
                "invoiceZoneConsumptionList": $scope.myVar

            });
            convertDate();
        };

        $scope.deleteUse = function(a, b) {
            ModalService.showModal({
                templateUrl: yesNoTemplatePath,
                controller: "YesNoController"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result == true) {
                        $scope.content.receiverPointList[a].invoiceList.splice(b, 1);
                    }
                });
            });

        };


        $scope.disableFields = function() {
            $scope.disableFirstSection = true;
        };
        $scope.enableFields = function() {
            $scope.disableFirstSection = false;
        };
        $scope.disableActualSection = function() {
            $scope.disableActualPrice = true;
        };
        $scope.enableActualSection = function() {
            $scope.disableActualPrice = false;
        };
        $scope.disableParametersSection = function() {
            $scope.disableParametersOffer = true;
        };
        $scope.enableParametersSection = function() {
            $scope.disableParametersOffer = false;
        };
        $scope.disableCalculationSection = function() {
            $scope.disableCalculationOffer = true;
        };
        $scope.enableCalculationSection = function() {
            $scope.disableCalculationOffer = false;
        };

    }]);
