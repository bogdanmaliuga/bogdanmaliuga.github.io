angular.module('myApp', ['angularModalService', 'ngAnimate'])


.controller('myCtrl', ["$scope", "$http", "ModalService", function($scope, $http, ModalService) {

    var req = {
        method: 'GET',
        url: '../data/punct.json',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }


    };


    $http(req)
        .then(function(response) {
            $scope.content = response.data;
            convertDate();
            $scope.content.creationDate = new Date($scope.content.creationDate);
            $scope.content.lastEditionDate = new Date($scope.content.lastEditionDate);



        });




    var convertDate = function() {
        angular.forEach($scope.content.receiverPointList, function(receiverPointList) {
            angular.forEach(receiverPointList.receiverPointOfferCalculation.proposalSellerList, function(v) {
                v.sellerTariffPublicationDate = new Date(v.sellerTariffPublicationDate);
            });
            if ($scope.content.allReceiverPointsOfferCalculation != null) {
                angular.forEach($scope.content.allReceiverPointsOfferCalculation.proposalSellerList, function(v) {
                    v.sellerTariffPublicationDate = new Date(v.sellerTariffPublicationDate);
                });
            }
            angular.forEach(receiverPointList.invoiceList, function(v) {
                v.periodStart = new Date(v.periodStart);
                v.getPeriodStop = new Date(v.getPeriodStop);
            });
        });
    };


    var reqPost = {
        method: 'POST',
        url: 'http://easy-energy.herokuapp.com/a/electricityOffer.json',
        data: $scope.content,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
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



        angular.forEach($scope.content.receiverPointList[p].invoiceList, function(invoiceList) {

            invoiceList.invoiceZoneConsumptionList[z].actualZoneCode = x;
        });
        $scope.content.receiverPointList[p].receiverPointOfferCalculation.actualReceiverPointFees.actualZoneFeeList[z].actualZoneCode = x;
        $scope.content.receiverPointList[p].receiverPointOfferCalculation.offerParameters.defaultZoneParamsList[z].actualZoneCode = x;

    };

    $scope.changeNameOfZoneCodeTwo = function(pp, p, z, x) {


        angular.forEach($scope.content.receiverPointList[pp].receiverPointOfferCalculation.proposalSellerList, function(proposalSellerList) {
            proposalSellerList.proposalZoneDetailsList[z].actualZoneCode = x;
        });

    };
    $scope.sendData = function() {
        $http(reqPost);
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
                    $scope.content.receiverPointList[p].receiverPointOfferCalculation.proposalSellerList.splice(c, 1);
                }
            });
        });


    };
    $scope.addCalculationOfferPoints = function(b) {
        $scope.content.allReceiverPointsOfferCalculation.proposalSellerList.push({
            "proposalZoneDetailsList": $scope.content.allReceiverPointsOfferCalculation.proposalSellerList[0].proposalZoneDetailsList
        });
    };
    $scope.addCalculationOffer = function(a) {
        if ($scope.content.receiverPointList[a].receiverPointOfferCalculation.proposalSellerList.length !== 0) {
            $scope.content.receiverPointList[a].receiverPointOfferCalculation.proposalSellerList.push({

                "proposalZoneDetailsList": $scope.content.receiverPointList[a].receiverPointOfferCalculation.proposalSellerList[0].proposalZoneDetailsList

            });
        } else {
            $scope.content.receiverPointList[a].receiverPointOfferCalculation.proposalSellerList.push({

                "proposalZoneDetailsList": [{
                        "actualZoneCode": "Strefa A1",
                        "sellerMinimalUnitPrice": 0,
                        "proposalUnitPrice": 0,
                        "proposalZoneCode": "Strefa A1 od "
                    },

                ]

            });
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
        if ($scope.content.receiverPointList.length == 1) {
            $scope.numberOfZones = $scope.content.receiverPointList[z].actualNumberOfZones;
            if ($scope.numberOfZones >= 1 && $scope.numberOfZones < 4) {
                if ($scope.content.allReceiverPointsOfferCalculation == null) {

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
                } else if ($scope.content.allReceiverPointsOfferCalculation != null) {
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
        } else if ($scope.content.receiverPointList.length > 1) {

            $scope.numberOfZones2 = $scope.content.receiverPointList[0].actualNumberOfZones;
            if ($scope.numberOfZones2 >= 1 && $scope.numberOfZones2 < 4) {

                if ($scope.content.allReceiverPointsOfferCalculation == null) {

                    angular.forEach($scope.content.receiverPointList, function(val) {
                        val.actualNumberOfZones += 1;
                        val.actualZoneList.push({
                            "actualZoneCodeCode": "new Strefa"
                        });
                        angular.forEach(val.invoiceList, function(value) {
                            value.invoiceZoneConsumptionList.push({
                                "actualZoneCode": "new Strefa",
                                "unitConsumption": 0
                            });
                        });
                        val.receiverPointOfferCalculation.actualReceiverPointFees.actualZoneFeeList.push({
                            "actualZoneCode": "new Strefa",
                            "actualUnitPrice": 0

                        });
                        val.receiverPointOfferCalculation.offerParameters.defaultZoneParamsList.push({
                            "actualZoneCode": "new Strefa",
                            "defaultUnitPrice": 0

                        });
                        angular.forEach(val.receiverPointOfferCalculation.proposalSellerList, function(value) {
                            value.proposalZoneDetailsList.push({
                                "actualZoneCode": "new Strefa",
                                "sellerMinimalUnitPrice": 0,
                                "proposalUnitPrice": 0,
                                "proposalZoneCode": "new Strefa od sellerCode"
                            });
                        });

                    })
                } else if ($scope.content.allReceiverPointsOfferCalculation != null) {
                    angular.forEach($scope.content.receiverPointList, function(val) {
                        val.actualNumberOfZones += 1;
                        val.actualZoneList.push({
                            "actualZoneCodeCode": "new Strefa"
                        });
                        angular.forEach(val.invoiceList, function(value) {
                            value.invoiceZoneConsumptionList.push({
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

                  if ($scope.content.receiverPointList.length == 1) {
                        $scope.delNumOfZones = $scope.content.receiverPointList[z].actualNumberOfZones;

                        if ($scope.delNumOfZones > 1 && $scope.delNumOfZones <= 4) {

                            if ($scope.content.allReceiverPointsOfferCalculation != null) {

                                $scope.content.receiverPointList[z].actualNumberOfZones -= 1;
                                $scope.content.receiverPointList[z].actualZoneList.splice(z, 1);
                                angular.forEach($scope.content.receiverPointList[z].invoiceList, function(value) {
                                    value.invoiceZoneConsumptionList.splice(-1, 1);
                                });
                                $scope.content.allReceiverPointsOfferCalculation.actualReceiverPointFees.actualZoneFeeList.splice(-1, 1);
                                $scope.content.allReceiverPointsOfferCalculation.offerParameters.defaultZoneParamsList.splice(-1, 1);
                                angular.forEach($scope.content.allReceiverPointsOfferCalculation.proposalSellerList, function(value) {
                                    value.proposalZoneDetailsList.splice(-1, 1);
                                });

                            } else if ($scope.content.allReceiverPointsOfferCalculation == null) {
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
                        }
                    } else if ($scope.content.receiverPointList.length > 1) {
                        $scope.delNumOfZones2 = $scope.content.receiverPointList[0].actualNumberOfZones;
                        if (($scope.delNumOfZones2 > 1 && $scope.delNumOfZones2 <= 4)) {
                            if ($scope.content.allReceiverPointsOfferCalculation != null) {

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




                            } else if ($scope.content.allReceiverPointsOfferCalculation == null) {

                                angular.forEach($scope.content.receiverPointList, function(val) {
                                    val.actualNumberOfZones -= 1;
                                    val.actualZoneList.splice(z, 1);

                                    angular.forEach(val.invoiceList, function(value) {
                                        value.invoiceZoneConsumptionList.splice(-1, 1);
                                    });
                                    val.receiverPointOfferCalculation.actualReceiverPointFees.actualZoneFeeList.splice(-1, 1);
                                    val.receiverPointOfferCalculation.offerParameters.defaultZoneParamsList.splice(-1, 1);
                                    angular.forEach(val.receiverPointOfferCalculation.proposalSellerList, function(v) {
                                        v.proposalZoneDetailsList.splice(-1, 1);
                                    })
                                });




                            }
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
