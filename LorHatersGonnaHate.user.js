// ==UserScript==
// @name           LOR Haters Gonna Hate
// @namespace      SKIPPED
// @updateURL      SKIPPED
// @require        SKIPPED
// @author         Sauron_AZM (sauronazm@gmail.com)
// @description    Provide interface for managing rage-lists.  
// @include        http://linux.org.ru/*
// @include        http://www.linux.org.ru/*
// @include        https://linux.org.ru/*
// @include        https://www.linux.org.ru/*
// @grant          SKIPPED
// @version        1.0.1
// @source         SKIPPED

// ==/UserScript==

var LorHatersGonnaHate = {

    panelDisabled: false,

    actions: [],
    groups: [],
    
    init: function () {
        if (localStorage['LorHatersGonnaHate'] != 1) {
            this.loadDefaultSettings();
            localStorage['LorHatersGonnaHate'] = 1;
            this.save();
        }
        else {
            this.load();
        }
        if (location.href.indexOf('/settings') > -1) {
            this.drawSettigsLink();
        }
    },

    loadDefaultSettings: function () {
        this.groupPonifags.check = this.defaultFilterFunction;
        this.groups.push(this.groupPonifags);
        this.actions.push(this.actionHideAvatar);
        this.actions.push(this.actionHideComment);
        LorHatersGonnaHate.groups[0].actions.push("1");
    },

    save: function () {
        localStorage['LorHatersGonnaHate.groups'] = JSON.stringify(this.groups, this.helpers.stringfyHelper);
        localStorage['LorHatersGonnaHate.actions'] = JSON.stringify(this.actions, this.helpers.stringfyHelper);
    },

    load: function () {
        this.groups = JSON.parse(localStorage['LorHatersGonnaHate.groups'], this.helpers.parseHelper);
        this.actions = JSON.parse(localStorage['LorHatersGonnaHate.actions'], this.helpers.parseHelper);
    },

    check: function (userlink) {
        for (var group in this.groups) {
            this.groups[group].check(userlink);
        }
    },

    helpers: {
        stringfyHelper: function (index, item) {
            if (typeof item == 'function') {
                item = item + '';
            }
            return item;
        },
        parseHelper: function (name, val) {
            if (!$.isNumeric(name) && val.indexOf('function (') > -1) {
                return eval(val);
            }
            return val;
        }
    },

    drawSettigsLink: function () {
        var settingsLink = $('<a href="#">Дополнительные настройки форума</a>');
        settingsLink.click(function () { return LorHatersGonnaHate.showSettings(this) }).attr('title', 'Показать дополнительные настройки');
        $('a[href="/user-filter"]').closest('li').after('<li>').next().append(settingsLink);
    },

    showSettings: function (settingsLink) {
        $(settingsLink).unbind().click(function () { return LorHatersGonnaHate.hideSettings(this) }).attr('title', 'Скрыть дополнительные настройки');


        var groupField = $('<select id="groupField" style="width:200px;"></select>');
        var deleteGroupButton = $('<input type="button" value="Удалить выбранную группу" style="margin-left:20px;"/>');
        var addNewGroupButton = $('<input type="button" value="Добавить новую группу" style="margin-left:20px;"/>');

        addNewGroupButton.click(function () { LorHatersGonnaHate.showAddNewGroupPanel($(this)); return false; });

        $(settingsLink)
            .after('<div id="AdditionalSettings"><div>Выберите группу:<div></div>')
            .next()
            .append(groupField).append(deleteGroupButton).append(addNewGroupButton);
        $(this.groups).each(function (id, item) {
            groupField.append('<option value=' + id + '>' + item.name + '</option>');
        });

        var actionField = $('<div id="actionField" />');
        groupField.next().next().after('<div>Отметьте правила:<div>').next().append(actionField);
        $(this.actions).each(function (id, item) {
            actionField.append('<div><input type="checkbox" value=' + id + '>' + item.name + '</input>' + 
                '<input type="button" onclick="return false;" style="margin-left:20px;" value="Редактировать"/></div>');
        });

        var userField = $('<textarea id="userField" style="font-size:0.7em;height:200px;display:block;" />');
        actionField.after('<div>Пользователи в группе:<div>').next().append(userField);
        $(this.groups[0].usernames).each(function (id, item) {
            userField.val(userField.val() + item + '\n');
        });

        userField.after('<input type="button" onclick="return false;" value="Сохранить изменения" style="margin-top:20px;" />');

        groupField.change(function () {
            LorHatersGonnaHate.bind(groupField.children(':selected').val(), actionField, userField);
        });

        this.bind(groupField.children(':selected').val(), actionField, userField);

        return false;
    },

    hideSettings: function(settingsLink) {
        $(settingsLink).unbind().click(function () { return LorHatersGonnaHate.showSettings(this) }).attr('title', 'Показать дополнительные настройки');
        $('#AdditionalSettings').hide();
        return false;
    },

    bind: function(groupId, actionField, userField) {
        if (this.groups[groupId] != null) {
            var selectedgroup = this.groups[groupId];
            actionField.children().each(function (id, item) {
                item.checked = false;
                if (selectedgroup.actions.indexOf(item.value) > -1) {
                    item.checked = true;
                }
            });
        }
    },

    showAddNewGroupPanel: function (addButton) {
        this.drawGroupPanel(addButton);
    },

    disableMainPanel: function() {
        $('#AdditionalSettings').find("*").prop('disabled', true);
        this.panelDisabled = true;
    },

    enableMainPanel: function () {
        $('#AdditionalSettings').find("*").removeProp('disabled');
        this.panelDisabled = false;
    },

    drawGroupPanel: function (addButton) {
        this.disableMainPanel();

        var groupPanel = $('<div style="background-color:#def;border:1px solid black;width:400px;padding:10px;position:absolute;"></div>');
        var nameTextbox = $('<input type="textbox" id="groupName"/>');
        var saveButton = $('<input type="button" value="Сохранить"/>');
        var cancelButton = $('<input type="button" value="Отменить"/>');

        saveButton.click(function () {
            LorHatersGonnaHate.addNewGroup(nameTextbox.val());
            groupPanel.hide();
            LorHatersGonnaHate.enableMainPanel();
            return false;
        });

        cancelButton.click(function () {
            groupPanel.hide();
            LorHatersGonnaHate.enableMainPanel();
            return false;
        });

        groupPanel.css('top', addButton.position().top);
        groupPanel.css('left', addButton.position().left - 100);

        groupPanel.append(nameTextbox).append(saveButton).append(cancelButton);
        $(document.body).append(groupPanel);
        nameTextbox.focus();
    },

    addNewGroup: function (groupName) {
        LorHatersGonnaHate.groups.push({
            name: groupName,
            usernames: [],
            actions: []
        });
    },

    // Begin sample actions. 

    actionHideAvatar: {
        name: 'Скрыть аватар',
        id: '1',
        work: function (userlink) {
            $(userlink).closest('.msg-container').find('.userpic').hide();
        }
    },

    actionHideComment: {
        name: 'Скрыть коммент',
        id: '2',
        work: function (userlink) {
            $(userlink).closest('.msg').hide();
        }
    },

    // End sample actions.

    // Begin sample filer. 

    groupPonifags: {
        name: 'Понифаги',
        usernames: ['a1batross',
            'amomymous',
            'AnimusPEXUS',
            'Antimatter',
            'avertex',
            'Cooler',
            'Copycat',
            'cryptohedge',
            'Dark_SavanT',
            'Darth_Revan',
            'dearboy',
            'Deneb',
            'derlafff',
            'drBatty',
            'druganddrop-2',
            'ekzotech',
            'essir',
            'evilmanul',
            'Extraterrestrial',
            'Falcon-peregrinus',
            'fornlr',
            'hizel',
            'Hoodoo',
            'Igorrr',
            'IPR',
            'ishitori',
            'kiverattes',
            'ktk',
            'Legioner',
            'Lorchanin',
            'mephistopheles',
            'mopsene',
            'morse',
            'Old_Hamster',
            'olibjerd',
            'PaxthonFettel',
            'proud_anon',
            'rikardoac',
            'Romaboy',
            'rtvd',
            'sudoer',
            'tailgunner',
            'vazgen05',
            'x0r'],
        actions: [],
        check: {}
    },

    // End sample filter.

    // Begin sample filter function.

    defaultFilterFunction: function (userlink) {
        if (this.usernames.indexOf($(userlink).text()) > -1) {
            for (var action in this.actions) {
                var targetAction = this.actions[action];
                LorHatersGonnaHate.actions.filter(function (item) {
                    if (item.id == targetAction) {
                        return item;
                    }
                })[0].work(userlink);
            }
        }
    }

    // End sample filter function.
};

LorHatersGonnaHate.init();
$('article.msg a[itemprop=\'creator\']').each(function (id, userlink) {
    LorHatersGonnaHate.check(userlink);
});