angular.module('myApp', ['angularModalService', 'ngAnimate'])
    .controller('myCtrl', ["$scope", "$http", "ModalService", function($scope, $http, ModalService) {

        var reqGet = {
            method: 'GET',
            url: 'https://easy-energy.herokuapp.com/a/electricityOffer/1.json',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }

        };
        var reqPostCalculation = {
            method: 'POST',
            dataType: 'json',
            url: 'https://easy-energy.herokuapp.com/a/CalculateElectricityOffer',
            data: $scope.content,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        var reqPostSave = {
            method: 'POST',
            dataType: 'json',
            url: 'https://easy-energy.herokuapp.com/a/electricityOffer.json',
            data: $scope.content,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(reqGet)
            .then(function(response) {
                $scope.content = response.data;
                convertDate();

            });


        $scope.sendData = function() {
            $scope.content.offerStorageId=null;
            convertDateFromObject();
            console.log($scope.content);


            $http({
              method: 'POST',
              dataType: 'json',
              url: 'https://easy-energy.herokuapp.com/a/electricityOffer.json',
              data:   {
                    "offerNumber": 1,
                    "creationDate": 1473325469377,
                    "lastEditionDate": 1473325469377,
                    "companyDTO": {
                        "id": null,
                        "companyName": "Hotel pod Dębami",
                        "companyCode": "Hotel pod Dębami",
                        "nip": "5641713529",
                        "regon": null,
                        "zipCode": "20-706",
                        "city": "Wrzosy",
                        "streetName": "Wysoki dołki",
                        "streetNumber": "4"
                    },
                    "receiverPointList": [

                        {
                            "receiverPointDescription": "Licznik numer 894837",
                            "tariffCode": "Taryfa Popołudniowa",
                            "actualNumberOfZones": 2,
                            "actualZoneList": [{
                                "actualZoneCodeCode": "Strefa A1"
                            }, {
                                "actualZoneCodeCode": "Strefa C2"
                            }],
                            "invoiceList": [{
                                "orderNumber": null,
                                "documentNumber": "FA 22/08/2016",
                                "periodStart": 1453248000000,
                                "getPeriodStop": 1464134400000,
                                "invoiceZoneConsumptionList": [{
                                    "actualZoneCode": "Strefa A1",
                                    "unitConsumption": 300
                                }, {
                                    "actualZoneCode": "Strefa C2",
                                    "unitConsumption": 200
                                }]
                            }, {
                                "orderNumber": null,
                                "documentNumber": "FA 188/10/2016",
                                "periodStart": 1457568000000,
                                "getPeriodStop": 1462838400000,
                                "invoiceZoneConsumptionList": [{
                                    "actualZoneCode": "Strefa A1",
                                    "unitConsumption": 300
                                }, {
                                    "actualZoneCode": "Strefa C2",
                                    "unitConsumption": 200
                                }]
                            }],
                            "receiverPointOfferCalculation": {
                                "totalConsumptionSummary": {
                                    "totalNumberOfDaysForAllPeriods": 60,
                                    "totalElectricityUnitsConsumptionInAllPeriods": 1000,
                                    "predictedElectricityUnitConsumptionPerYear": 6000
                                },
                                "actualReceiverPointFees": {
                                    "actualTradeFee": 15,
                                    "actualZoneFeeList": [{
                                        "actualZoneCode": "Strefa A1",
                                        "actualUnitPrice": 200
                                    }, {
                                        "actualZoneCode": "Strefa C2",
                                        "actualUnitPrice": 300
                                    }]
                                },
                                "offerParameters": {
                                    "proposalContractMonthLength": 24,
                                    "defaultProposalTradeFee": 12,
                                    "defaultZoneParamsList": [{
                                        "actualZoneCode": "Strefa A1",
                                        "defaultUnitPrice": 150
                                    }, {
                                        "actualZoneCode": "Strefa C2",
                                        "defaultUnitPrice": 250
                                    }],
                                    "defaultZoneCodesSameAsActual": false
                                },
                                "proposalSellerList": [{
                                    "sellerCode": "Tauron",
                                    "proposalTradeFee": 12,
                                    "sellerTariffPublicationDate": 1473325469349,
                                    "proposalZoneDetailsList": [{
                                        "actualZoneCode": "Strefa A1",
                                        "sellerMinimalUnitPrice": 150,
                                        "proposalUnitPrice": 180,
                                        "proposalZoneCode": "Strefa A1 od Tauron"
                                    }, {
                                        "actualZoneCode": "Strefa C2",
                                        "sellerMinimalUnitPrice": 150,
                                        "proposalUnitPrice": 280,
                                        "proposalZoneCode": "Strefa C2 od Tauron"
                                    }],
                                    "receiverPointEstimation": {
                                        "sellerCode": "Tauron",
                                        "receiverPointDataEstimation": {
                                            "tariffIssueDate": 1473325469350,
                                            "estimatedUnitConsumptionInYearScale": 99999,
                                            "estimatedContractProfitValue": 5000,
                                            "estimatedContractProfitValueInYearScale": 2500,
                                            "estimatedSavingsInYearScale": 600,
                                            "estimatedSavingsInContractScale": 1200,
                                            "estimatedSavingsInPercentage": 30
                                        },
                                        "receiverPointProvisionList": [{
                                            "levelCode": "Próg I",
                                            "traderProvisionInYearScale": 300,
                                            "traderProvisionInContractScale": 600,
                                            "partnerProvisionInContractScale": 150
                                        }, {
                                            "levelCode": "Próg II",
                                            "traderProvisionInYearScale": 400,
                                            "traderProvisionInContractScale": 800,
                                            "partnerProvisionInContractScale": 200
                                        }, {
                                            "levelCode": "Próg III",
                                            "traderProvisionInYearScale": 500,
                                            "traderProvisionInContractScale": 1000,
                                            "partnerProvisionInContractScale": 250
                                        }]
                                    }
                                }, {
                                    "sellerCode": "Cez",
                                    "proposalTradeFee": 13,
                                    "sellerTariffPublicationDate": 1473325469351,
                                    "proposalZoneDetailsList": [{
                                        "actualZoneCode": "Strefa A1",
                                        "sellerMinimalUnitPrice": 110,
                                        "proposalUnitPrice": 175,
                                        "proposalZoneCode": "Strefa A1 od CEZ"
                                    }, {
                                        "actualZoneCode": "Strefa C2",
                                        "sellerMinimalUnitPrice": 185,
                                        "proposalUnitPrice": 275,
                                        "proposalZoneCode": "Strefa C2 od CEZ"
                                    }],
                                    "receiverPointEstimation": {
                                        "sellerCode": "Cez",
                                        "receiverPointDataEstimation": {
                                            "tariffIssueDate": 1473325469351,
                                            "estimatedUnitConsumptionInYearScale": 9999,
                                            "estimatedContractProfitValue": 5000,
                                            "estimatedContractProfitValueInYearScale": 2500,
                                            "estimatedSavingsInYearScale": 600,
                                            "estimatedSavingsInContractScale": 1200,
                                            "estimatedSavingsInPercentage": 30
                                        },
                                        "receiverPointProvisionList": [{
                                            "levelCode": "Próg I",
                                            "traderProvisionInYearScale": 350,
                                            "traderProvisionInContractScale": 700,
                                            "partnerProvisionInContractScale": 175
                                        }, {
                                            "levelCode": "Próg II",
                                            "traderProvisionInYearScale": 450,
                                            "traderProvisionInContractScale": 900,
                                            "partnerProvisionInContractScale": 225
                                        }, {
                                            "levelCode": "Próg III",
                                            "traderProvisionInYearScale": 550,
                                            "traderProvisionInContractScale": 1100,
                                            "partnerProvisionInContractScale": 275
                                        }]
                                    }
                                }]
                            }
                        }
                    ],
                    "allReceiverPointsOfferCalculation": null,
                    "offerSummaryDTO": {
                        "receiverPointEstimationList": [{
                            "sellerCode": "TAURON",
                            "allReceiverPointsDataEstimationForSeller": {
                                "tariffIssueDate": 1473325469351,
                                "estimatedContractValueForAllPoint": 5000,
                                "estimatedContractValueInYearScaleForAllPoint": 2500,
                                "estimatedSavingsInYearScaleForAllPoint": 600,
                                "estimatedSavingsInContractScaleForAllPoint": 1200,
                                "estimatedSavingsInPercentageForAllPoint": 30
                            },
                            "allReceiverPointsProvisionForSellerList": [{
                                "levelCode": "Próg I",
                                "traderProvisionInYearScaleForAllPoint": 300,
                                "traderProvisionInContractScaleForAllPoint": 600,
                                "partnerProvisionInContractScaleForAllPoint": 150
                            }, {
                                "levelCode": "Próg II",
                                "traderProvisionInYearScaleForAllPoint": 400,
                                "traderProvisionInContractScaleForAllPoint": 800,
                                "partnerProvisionInContractScaleForAllPoint": 200
                            }, {
                                "levelCode": "Próg III",
                                "traderProvisionInYearScaleForAllPoint": 500,
                                "traderProvisionInContractScaleForAllPoint": 1000,
                                "partnerProvisionInContractScaleForAllPoint": 250
                            }]
                        }, {
                            "sellerCode": "CEZ",
                            "allReceiverPointsDataEstimationForSeller": {
                                "tariffIssueDate": 1473325469352,
                                "estimatedContractValueForAllPoint": 2500,
                                "estimatedContractValueInYearScaleForAllPoint": 1250,
                                "estimatedSavingsInYearScaleForAllPoint": 300,
                                "estimatedSavingsInContractScaleForAllPoint": 600,
                                "estimatedSavingsInPercentageForAllPoint": 30
                            },
                            "allReceiverPointsProvisionForSellerList": [{
                                "levelCode": "Próg I",
                                "traderProvisionInYearScaleForAllPoint": 350,
                                "traderProvisionInContractScaleForAllPoint": 700,
                                "partnerProvisionInContractScaleForAllPoint": 175
                            }, {
                                "levelCode": "Próg II",
                                "traderProvisionInYearScaleForAllPoint": 450,
                                "traderProvisionInContractScaleForAllPoint": 900,
                                "partnerProvisionInContractScaleForAllPoint": 225
                            }, {
                                "levelCode": "Próg III",
                                "traderProvisionInYearScaleForAllPoint": 550,
                                "traderProvisionInContractScaleForAllPoint": 1100,
                                "partnerProvisionInContractScaleForAllPoint": 275
                            }]
                        }]
                    },
                    "offerNote": "Estymacja może ulec zmianie w przypadku zmian cen sprzedawcy energii",
                    "offerCalculationPerReceiverPointSet": true
                },
              headers: {
                  'Content-Type': 'application/json'
              }
            }).success(function(response){
                    $scope.response = response;
                }).error(function(error){
                    $scope.error = error;
                });
            convertDate();
        };

        $scope.sendCalculation = function() {

          convertDateFromObject();

          $http(reqPostCalculation).success(function(response){
                  $scope.response = response;
              }).error(function(error){
                  $scope.error = error;
              });
          convertDate();


        };

        var convertDate = function() {
            $scope.content.creationDate = new Date($scope.content.creationDate);
            $scope.content.lastEditionDate = new Date($scope.content.lastEditionDate);

            angular.forEach($scope.content.receiverPointList, function(receiverPointList) {
                angular.forEach(receiverPointList.invoiceList, function(invoiceList) {
                    invoiceList.periodStart = new Date(invoiceList.periodStart);
                    invoiceList.getPeriodStop = new Date(invoiceList.getPeriodStop);
                });

                if ($scope.content.offerCalculationPerReceiverPointSet == true) {
                    angular.forEach(receiverPointList.receiverPointOfferCalculation.proposalSellerList, function(proposalSellerList) {
                        proposalSellerList.sellerTariffPublicationDate = new Date(proposalSellerList.sellerTariffPublicationDate);
                    });

                } else if ($scope.content.offerCalculationPerReceiverPointSet == false) {

                }

            });
        };

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
                            "actualZoneCodeCode": "Strefa A1"
                        }

                    ],
                    "invoiceList": [{
                        "orderNumber": null,
                        "documentNumber": "FA 1",
                        "periodStart": new Date(),
                        "getPeriodStop": new Date(),
                        "invoiceZoneConsumptionList": [{
                                "actualZoneCode": "Strefa A1",
                                "unitConsumption": 0
                            }

                        ]
                    }],
                    "receiverPointOfferCalculation": {

                        "actualReceiverPointFees": {

                            "actualZoneFeeList": [{
                                "actualZoneCode": "Strefa A1",
                                "actualUnitPrice": 0
                            }]
                        },
                        "offerParameters": {

                            "defaultZoneParamsList": [{
                                "actualZoneCode": "Strefa A1",
                                "defaultUnitPrice": 0
                            }],
                            "defaultZoneCodesSameAsActual": false
                        },
                        "proposalSellerList": [{
                                "sellerTariffPublicationDate": new Date(),
                                "proposalZoneDetailsList": [{
                                        "actualZoneCode": "Strefa A1",
                                        "sellerMinimalUnitPrice": 0,
                                        "proposalUnitPrice": 0,
                                        "proposalZoneCode": "Strefa A1 od "
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
                templateUrl: "../templates/yesno.html",
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
                templateUrl: "../templates/yesno.html",
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

            if ($scope.num >= 1 && $scope.num < 4) {
                // Коли чекбокс тру,тоді для кожного пункту свій окремий лічильник
                if ($scope.content.offerCalculationPerReceiverPointSet == true) {
                    $scope.content.receiverPointList[z].actualNumberOfZones += 1;
                    $scope.content.receiverPointList[z].actualZoneList.push({
                        "actualZoneCodeCode": "new Strefa"
                    });

                    angular.forEach($scope.content.receiverPointList[z].invoiceList, function(value) {
                        value.invoiceZoneConsumptionList.push({
                            "actualZoneCode": "new Strefa",
                            "unitConsumption": 0
                        });
                    });
                    $scope.content.receiverPointList[z].receiverPointOfferCalculation.actualReceiverPointFees.actualZoneFeeList.push({
                        "actualZoneCode": "new Strefa",
                        "actualUnitPrice": 0

                    });
                    $scope.content.receiverPointList[z].receiverPointOfferCalculation.offerParameters.defaultZoneParamsList.push({
                        "actualZoneCode": "new Strefa",
                        "defaultUnitPrice": 0

                    });

                    angular.forEach($scope.content.receiverPointList[z].receiverPointOfferCalculation.proposalSellerList, function(value) {
                        value.proposalZoneDetailsList.push({
                            "actualZoneCode": "new Strefa",
                            "sellerMinimalUnitPrice": 0,
                            "proposalUnitPrice": 0,
                            "proposalZoneCode": "new Strefa od sellerCode"
                        });
                    });

                }
                //Коли чекбокс фолс,тоді для всіх пунктів один лічильник
                else if ($scope.content.offerCalculationPerReceiverPointSet == false) {

                    angular.forEach($scope.content.receiverPointList, function(receiverPointList) {
                        receiverPointList.actualNumberOfZones += 1;
                        receiverPointList.actualZoneList.push({
                            "actualZoneCodeCode": "new Strefa"
                        });
                        angular.forEach(receiverPointList.invoiceList, function(invoiceList) {
                            invoiceList.invoiceZoneConsumptionList.push({
                                "actualZoneCode": "new Strefa",
                                "unitConsumption": 0
                            });
                        });
                    });

                    $scope.content.allReceiverPointsOfferCalculation.actualReceiverPointFees.actualZoneFeeList.push({
                        "actualZoneCode": "new Strefa",
                        "actualUnitPrice": 0
                    });
                    $scope.content.allReceiverPointsOfferCalculation.offerParameters.defaultZoneParamsList.push({
                        "actualZoneCode": "new Strefa",
                        "defaultUnitPrice": 0

                    });

                    angular.forEach($scope.content.allReceiverPointsOfferCalculation.proposalSellerList, function(value) {
                        value.proposalZoneDetailsList.push({
                            "actualZoneCode": "new Strefa",
                            "sellerMinimalUnitPrice": 0,
                            "proposalUnitPrice": 0,
                            "proposalZoneCode": "new Strefa od sellerCode"
                        });
                    });
                }
            }

        };

        $scope.deleteNumberOfZones = function(z) {

            ModalService.showModal({
                templateUrl: "../templates/yesno.html",
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
                                $scope.content.receiverPointList[z].actualZoneList.splice(z, 1);
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
                                    val.actualZoneList.splice(z, 1);
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
                templateUrl: "../templates/yesno.html",
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
