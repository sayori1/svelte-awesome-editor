import { Header } from './Header/header';
import { Text } from './Text/text';
import type { Component } from './component';

export function componentFromJson(json:any):Component{
    if(json['name'] == 'Text'){
        return Text.fromJson(json);
    }
    if(json['name'] == 'Header'){
        return Header.fromJson(json);
    }
    throw json['name'] + ' fromJson method is unimplemented'
}

export function componentToJson(component:Component):any{
    return component.toJson();
}
