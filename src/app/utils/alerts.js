

const alertInfo=(message) =>
{
    alert(message);
}

const alertCreated=() =>
{
    alert('Kayıt başarıyla oluşturuldu');
}

const alertUpdated=() =>
{
    alert('Kayıt başarıyla güncellendi');
}

const alertDeleted=() =>
{
    alert('Kayıt başarıyla silindi');
}


const alertException=(messages) =>
{
    let errors = '';
    for (let index = 0; index < messages.length; index++) {
        errors += '\n' + messages[index];
    }
    alert(errors);
}

export {alertInfo,alertException,alertCreated,alertUpdated,alertDeleted};