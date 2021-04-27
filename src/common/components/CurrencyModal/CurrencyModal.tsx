import React, { useState, useContext, useMemo, useEffect } from 'react';
import CheckIcon from 'remixicon-react/CheckLineIcon';
import clsx from 'clsx';

import { StoreContext, IStoreContext } from 'context/Store';
import Modal from 'common/components/Modal';
import SearchInput from 'common/components/SearchInput';
import RoundedFlag from 'common/components/RoundedFlag';
import Typography from 'common/components/Typography';
import Button from 'common/components/Button';
import { Column } from 'common/styles/layout';
import { IAccount } from 'common/types/account';
import { searchList, highlightQuery } from 'common/utils';
import { Wrapper, CurrenciesList, Currency } from './styled';

interface IProps {
  isOpen: boolean;
  selectedAccount: IAccount;
  onSelectAccount: (account: IAccount) => void;
  onClose: () => void;
}

const CurrencyModal = ({
  isOpen,
  selectedAccount,
  onSelectAccount,
  onClose,
}: IProps) => {
  const { accounts } = useContext<IStoreContext>(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  const [
    internalSelectedAccount,
    setInternalSelectedAccount,
  ] = useState<IAccount>(selectedAccount);
  const filteredAccounts = useMemo<IAccount[]>(() => {
    if (!searchTerm) return accounts;

    return searchList(accounts, searchTerm, ['currency', 'currencyName']);
  }, [accounts, searchTerm]);

  useEffect(() => {
    if (!isOpen) setSearchTerm('');
    if (isOpen !== internalIsOpen) setInternalIsOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setInternalIsOpen(false);
    setTimeout(onClose, 250);
  };

  return (
    <Modal isOpen={internalIsOpen} onClose={closeModal}>
      <Wrapper>
        <SearchInput
          value={searchTerm}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setSearchTerm(e.currentTarget.value);
          }}
          className="search-input"
        />
        <CurrenciesList>
          {filteredAccounts.map(account => (
            <Currency
              key={account.id}
              htmlFor={account.id}
              className={clsx({
                active: account.id === internalSelectedAccount.id,
              })}
            >
              <input
                type="checkbox"
                id={account.id}
                checked={account.id === internalSelectedAccount.id}
                name="currency"
                onChange={() => {
                  setInternalSelectedAccount(account);
                }}
              />
              <div className="content">
                <RoundedFlag country={account.countryCode} />
                <Column className="info">
                  <Typography
                    fontWeight="bold"
                    className={clsx({
                      'search-active': searchTerm !== '',
                    })}
                    dangerouslySetInnerHTML={{
                      __html: highlightQuery(account.currency, searchTerm),
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text"
                    shade="light"
                    className={clsx({
                      'search-active': searchTerm !== '',
                    })}
                    dangerouslySetInnerHTML={{
                      __html: highlightQuery(account.currencyName, searchTerm),
                    }}
                  />
                </Column>
                <CheckIcon className="check-icon" />
              </div>
            </Currency>
          ))}
        </CurrenciesList>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            onSelectAccount(internalSelectedAccount);
            closeModal();
          }}
        >
          {internalSelectedAccount.currency} -{' '}
          {internalSelectedAccount.currencyName}
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default CurrencyModal;
