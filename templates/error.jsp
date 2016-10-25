<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" ng-click="close()" data-dismiss="modal" aria-hidden="true">&times;</button>{{errorCode}}</h4>
            </div>
            <div class="modal-body">

                {{message}}

            </div>
            <div class="modal-footer">
                <button type="button" ng-click="close()" class="btn btn-primary" data-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>